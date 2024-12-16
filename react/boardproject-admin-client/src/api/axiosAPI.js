// axiosAPI 설정
// 자동 임포트하면 중괄호 사라지는데, 이유머지
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL : 'http://localhost:8080',
  headers : {'Content-Type' : 'application/json'}
  // withCredentials : true // 쿠키 포함 설정
  // 서버에서도 credential 허용 설정 필요 !!
});