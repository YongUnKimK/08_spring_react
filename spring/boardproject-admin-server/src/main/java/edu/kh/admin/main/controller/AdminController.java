package edu.kh.admin.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.admin.main.model.dto.Member;
import edu.kh.admin.main.model.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@CrossOrigin(origins="http://localhost:3000")
// 서버 : 8080  <-> 클라이언트 : 3000 => 요청 응답시 출처는 브라우저고, 리소스유출을 기본적으로 막는다. cors error발생 ( CrossOrigin하지 않으면 ) 
@RequestMapping("admin")
@RequiredArgsConstructor
@Slf4j
@SessionAttributes({"loginMember"})
public class AdminController {
	
	private final AdminService service;
	
	/** 관리자 로그인
	 * @param inputMember
	 * @param model
	 * @return
	 */
	@PostMapping("login")
	public Member login(@RequestBody Member inputMember, 
						Model model) {
		
		Member loginMember = service.login(inputMember);
		
		if(loginMember == null) {
			return null;
		} 
		
		
		model.addAttribute(loginMember);
		
		return loginMember;
	}	
	
	
	@GetMapping("logout")
	public ResponseEntity<String> logout(HttpSession session) {
		
		// ResponseEntity
		// Spring에서 제공하는 Http 응답 데이터를 커스터마이징 할 수 있도록 지원하는 클래스
		// HTTP 상태코드, 헤더, 응답 본문 ( body )을 모두 설정 가능
		
		try {
			session.invalidate(); // 세션 무효화 처리
			return ResponseEntity.status(HttpStatus.OK).body("로그아웃이 완료되었습니다"); //Ok->200번
			
		} catch(Exception e) {
			// 세션 무효화 중 예외 발생한 경우
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그아웃 처리중 문제 발생 : " + e.getMessage()); // 서버에서 발생한 500번 오류
		} 
			
	}
}
