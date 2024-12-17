package edu.kh.admin.main.model.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.admin.common.util.Utility;
import edu.kh.admin.main.model.dto.Board;
import edu.kh.admin.main.model.dto.Member;
import edu.kh.admin.main.model.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor= Exception.class)
public class AdminServiceImpl implements AdminService {

	private final AdminMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	
	/**
	 * 관리자 로그인
	 */
	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = mapper.login(inputMember.getMemberEmail());
		
		if(loginMember == null) return null;
		
		if(!bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
			return null;
		}
		
		// 같을 경우만
		loginMember.setMemberPw(null);
		
		return loginMember;
	}
	
	// 탈퇴회원조회
	@Override
	public List<Member> selectWithdrawnMembers() {
		
		return mapper.selectWithdrawnMemberList();
	}
	
	// 탈퇴회원복구
	@Override
	public int restoreMember(int memberNo) {
		// TODO Auto-generated method stub
		return mapper.restoreMember(memberNo);
	}
	
	// 삭제된 게시물 조회
	@Override
	public List<Board> selectDeleteBoardLists() {
		// TODO Auto-generated method stub
		return mapper.selectDeleteBoardList();
	}
	
	// 삭제된 게시물 복구
	@Override
	public int restoreBoard(int boardNo) {
		
		return mapper.restoreBoard(boardNo);
	}
	
	//신규 회원 조회
	@Override
	public List<Member> getNewMember() {
	
		return mapper.getNewMember();
	}
	
	// 최대 게시글 조회
	@Override
	public Board maxReadCount() {
		
		return mapper.maxReadCount();
	}
	
	// 최대 좋아요 게시글 조회
	@Override
	public Board maxLikeCount() {
		
		return mapper.maxLikeCount();
	}
	
	// 최대 댓글 게시글 조회
	@Override
	public Board maxCommentCount() {
		return mapper.maxCommentCount();
	}
	
	// 관리자 계정 조회
	@Override
	public List<Member> adminAccountList() {		
		return mapper.adminAccountList();
	}
	
	// 관리자 계정 발급
	@Override
	public String createAdminAccount(Member member) {
		
		// 1. 영어(대소문자), 숫자 6자리 난수로 만든 비밀번호를 암호환 값 구하기	
		String rawPw = Utility.generatePassword(); // 평문 비밀번호
		String encPw = bcrypt.encode(rawPw); // 암호화된 비밀번호
		
		// 2. member에 암호화된 비밀번호 세팅
		member.setMemberPw(encPw);
		
		// 3. Db에 암호화된 비밀번호가 세팅된 member를 전달하여 계정 발급
		int result = mapper.createAdminAccount(member);
				
		// 4. 계정 발급 정상처리 되었다면, 발급된 평문비밀번호 리턴하기.
		if(result > 0 ) {
			return rawPw; // 평문 비밀번호
		} else {
			return null;
		}			
	}
}
