import logo from './logo.svg';
import '../src/css/App.css'; 
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './components/AuthContext';
import { BrowserRouter } from 'react-router';

// Context API 사용하는 방법 2가지

// 1. 컴포넌트 분리하여 하위 컴포넌트에서 useContext 이용하는 방법
// 제공이 먼저 되고 소비가 되어야 하지만 소비가 먼저 되었기 때문에 오류 발생
// 아래처럼 컴포넌트를 분리해주고 제공 -> 소비 순으로 이루어지게 해야함 ( 2번째 방법은 하위에)
function App() {
  return (
    <AuthProvider>
      <AppComponent>        
      </AppComponent>
    </AuthProvider>
  );
};

function AppComponent() {

  // 로그인을 했다면 DashBoard  렌더링
  // 로그인을 안했다면 login 렌더링
  // -> 조건 : 로그인 여부
  // ->       로그인을 했는지 안했는지 기억해줄 상태값이 필요함(user)
  //          user 상태에는 로그인 한 사람에 대한 정보를 세팅.
  // ->       전역 관리를 해야함 -> user 라는 상태는 App 에서 뿐만 아니라 
  //          App 의 자식(하위) 컴포넌트에서도 이용 가능해야함.
  //        -> Context API 사용 해야함!!!

  const { user } = useContext(AuthContext);
  // Consume이 생략되어있다 ( 이미 불림 ) useContext
  return (
    // children이 됨 
    <> 
      { user ? 
      (
        <div className='body-container'>
          <BrowserRouter>
            <DashBoard />
          </BrowserRouter>         
        </div>
      )  : (
        <div className='login-section'>
          <Login />
        </div>
      )
    }
    </>
  );
}

// 2. <AuthProvider> 안에서 <AuthContext.Consumer> 이용하는 방법
// -> <AuthContext.Consumer> 안에서 익명함수 형태로 전역 상태를 꺼내어 사용
// function App() {
//   return (
//     <AuthProvider>
//       <AuthContext.Consumer>
//         {({ user }) =>
//           user ? (
//             <div className="body-container">
//               <DashBoard />
//             </div>
//           ) : (
//             <div className="login-section">
//               <Login />
//             </div>
//           )
//         }
//       </AuthContext.Consumer>
//     </AuthProvider>
//   );
// }
// 

export default App;
