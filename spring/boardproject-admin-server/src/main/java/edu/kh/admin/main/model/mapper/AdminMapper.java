package edu.kh.admin.main.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.admin.main.model.dto.Board;
import edu.kh.admin.main.model.dto.Member;

@Mapper
public interface AdminMapper {

	// 관리자 로그인
	Member login(String memberEmail);

	// 탈퇴회원멤버조회
	List<Member> selectWithdrawnMemberList();

	// 탈퇴 회원 복구
	int restoreMember(int memberNo);

	// 삭제된 게시물 조회
	List<Board> selectDeleteBoardList();

	// 삭제된 게시물 복구
	int restoreBoard(int boardNo);

	// 신규 회원 조회
	List<Member> getNewMember();

	// 최대 조회수 게시글 조회
	Board maxReadCount();

	// 최대 좋아요 게시글 조회
	Board maxLikeCount();

	// 최대 댓글 게시글 조회
	Board maxCommentCount();

}
