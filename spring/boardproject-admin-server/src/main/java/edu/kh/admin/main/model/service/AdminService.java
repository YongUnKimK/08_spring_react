package edu.kh.admin.main.model.service;

import java.util.List;

import edu.kh.admin.main.model.dto.Board;
import edu.kh.admin.main.model.dto.Member;

public interface AdminService {

	
	/** 관리자 로그인
	 * @param inputMember
	 * @return
	 */
	Member login(Member inputMember);
	
	/** 탈퇴한 회원 목록 조회
	 * @return
	 */
	List<Member> selectWithdrawnMembers();

	// 탈퇴 회원 복구
	int restoreMember(int memberNo);

	// 삭제된 게시물 조회
	List<Board> selectDeleteBoardLists();

	// 삭제된 게시물 복구
	int restoreBoard(int boardNo);

	// 신규 회원 조회
	List<Member> getNewMember();
	
	// 최대 조회수 게시글 조회
	Board maxReadCount();

	// 최대 좋아요 게시물 조회
	Board maxLikeCount();
	
	// 최대 댓글 게시글 조회
	Board maxCommentCount();

	// 관리자 계정 조회
	List<Member> adminAccountList();
	
	// r관리자 계정 발급
	String createAdminAccount(Member member);
	

}
