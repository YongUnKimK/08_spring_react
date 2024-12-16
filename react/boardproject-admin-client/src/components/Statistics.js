import React, { useEffect, useState }  from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Statistics() {

  // 조회수, 좋아요, 댓글, 로딩
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 최대 조회 수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const response = await axiosApi.get("/admin/maxReadCount");
      if( response.status === 200) {
        setReadCountData(response.data);
      }


    } catch (error) {
      console.log("최대 조회 게시글 조회 중 예외 발생 : ", error);
    }

  };

  // 최대 좋아요 수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const response = await axiosApi.get("/admin/maxLikeCount")
      if( response.status === 200) {
        setLikeCountData(response.data);        
      }

    } catch (error) {
      console.log("최대 좋아요 게시글 조회 중 오류 발생 ") 
    }
  };

  // 최대 댓글 수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const response = await axiosApi.get("/admin/maxCommentCount")
      if(response.status === 200) {
        setCommentCountData(response.data);
      }
    } catch (error) {
      console.log("최대 댓글 게시글 조회 중 오류 발생 ") 
    }
  };

  // Statistics 컴포넌트가 처음 렌더링될 때 콜백함수 내용
  // -> 위에 만든 비동기 요청 함수 실행
  useEffect( () => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
  }, []); 

  //readCountDate, likeCountData, commentCountData의 변화가 감지될 때 콜백함수 내용수행
  // -> isLoading 상태값을 false로 변경하기

  useEffect( () => {
    if(readCountData != null 
      &&        likeCountData != null 
      && commentCountData != null
      ) {
        setIsLoading(false);

    };
  }, [readCountData, likeCountData, commentCountData]);

  if(isLoading) { 
    return <h1> Loading중 </h1>
  } else {
    return (
      <div>
        {/* 7일 이내 가입한 신규 회원 조회*/ }
        <NewMembers />

        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p> 게시판 종류 : {readCountData.boardName}</p>
          <p> 게시글 번호 / 제목 : {readCountData.boardNo} / {readCountData.boardTitle}</p>
          <p> 게시글 조회 수 : {readCountData.readCount}</p>
          <p> 작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>
  
        <section className="statistics-section1">
          <h2>가장 좋아요 많은 게시글</h2>
          <p> 게시판 종류 : {likeCountData.boardName}</p>
          <p> 게시글 번호 / 제목 : {likeCountData.boardNo} / {likeCountData.boardTitle}</p>
          <p> 게시글 좋아요 수 : {likeCountData.likeCount}</p>
          <p> 작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>
  
        <section className="statistics-section2">
          <h2>가장 댓글 많은 게시글</h2>
          <p> 게시판 종류 : {commentCountData.boardName}</p>
          <p> 게시글 번호 / 제목 : {commentCountData.boardNo} / {commentCountData.boardTitle}</p>
          <p> 게시글 댓글 수 : {commentCountData.commentCount}</p>
          <p> 작성자 닉네임 : {commentCountData.memberNickname}</p>
        </section>
      </div>
    );    
  }

}

// 신규 회원 조회 ~ * useEffect는 async를 넣으면 좋은 코드 x
const NewMembers = () => {  

  const [newMembers, setNewMembers] = useState(null);
  useEffect(() => {

    const fetchNewMembers = async() => {
      try {
        const response = await axiosApi.get("/admin/newMember");
        
        if(response.status === 200) {
          setNewMembers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewMembers();
  }, []);
  return (
    <div className="new-members">
      <h2> 신규 가입 회원 ({newMembers?.length}명) </h2>
      <h3> [ 7일 이내 가입 회원 ]</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>회원 번호 : </th>
            <th>이메일 : </th>
            <th>닉네임 : </th>
            <th>가입일 : </th>  
          </tr>          
        </thead>                
        <tbody>
          {newMembers?.map((member) => (
            <tr key={member.memberNo}>
                <td>{member.memberNo}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberNickname}</td>
                <td>{member.enrollDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
