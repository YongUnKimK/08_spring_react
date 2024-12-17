import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Manager() {

  const [accountList, setAcconutList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");

  // 관리자 계쩡 목록 조회 함수
  const getAdminAccountList = async () => {
    try {
      const response = await axiosApi.get("/admin/adminAccountList");
      if ( response.status === 200) {
        setAcconutList(response.data);
        
      }
      
    } catch (error) {
      console.error("관리자 계정 목록 조회 중 에러 발생 : " , error);
    }
  };

  // 관리자 계정 발급
  const createAdminAccount = async () => {
    if(email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const response = await axiosApi.post("/admin/createAdminAccount", {
        memberEmail : email ,
        memberNickname : nickname,
        memberTel : tel
      });
      if( response.status === 201) { // 자원이 성공적으로 생성될 때
        const result = response.data; // 서버에서 응답해준 데이터 ( body )
        alert( `발급된 비밀번호는 ${result} 입니다. 다시 확인할 수 없으니 저장해주시기 바란다.`);
        console.log(result);
      }
      if(response.status === 204) { // 서버에서 요청을 처리했지만 콘텐츠를 제공하지 않음
        alert("관리자 계정 발급 실패 : 입력된 데이터로 계정 생성 불가능.");
      }
      
      setEmail(""); // 입력 필드 초기화
      setNickname("");
      setTel("");

      // 계정 목록 새로고침
      getAdminAccountList();

    } catch (error) {
      console.error("관리자 계정 등록 중 오류 발생 : " , error);

    }


  };

  useEffect( () => {
    getAdminAccountList();
  } , []);

  // accountList가 변화할 경우 실행
  useEffect( () => {
    if(accountList != null) {
      setIsLoading(false);
    }
  }, [accountList]);

  if(isLoading) {
    return <h1> loading .........</h1>
  } else {
    return (
      <>
        <div className="manager-div">
          <section className="manager-section">
            <h2>관리자 계정 발급</h2>
            <table>
              <thead>
              <tr>
                <td>사용할 이메일 : </td>
                <td>
                  <input
                    id="email"
                    type="email"
                    placeholder="ex) admin2@kh.or.kr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>사용할 이름 : </td>
                <td>
                  <input id="nickname" type="text" placeholder="ex) 관리자2" 
                  value={nickname}
                  onChange={(e)=> setNickname(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td>사용할 전화번호 : </td>
                <td>
                  <input id="tel" type="text" placeholder="ex) 01012341234" 
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}/>
                </td>
              </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
            <button className="issueBtn" onClick={createAdminAccount}>발급</button>
          </section>
  
          <section className="manager-section">
            <h2>관리자 계정 목록</h2>
            <table className="manager-list-table" border={1}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이메일</th>
                  <th>관리자명</th>
                  <th> 관리자 연락처 </th>
                </tr>
              </thead>
              <tbody>   
                {accountList.map((member) => (
                  <tr key={member.memberNo}>
                    <td>{member.memberNo}</td>
                    <td>{member.memberEmail}</td>
                    <td>{member.memberNickname}</td>
                    <td>{member.memberTel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </>
    );
  }
}
