import React, {useState} from "react";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [saveIDFlag, setSaveIDFlag] = useState(false);

     // 로그인 버튼 클릭
    const handleLogin = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log("로그인 시도:", email, password);

    // 간단한 유효성 검사
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요!");
      return;
    }

    alert("로그인 성공");
    navigate("/home");
  };

  const handleSaveIDFlag = () =>{
    setSaveIDFlag((prev) => !prev);
  };

  return (
    <div className="login-container">
      <h2 className="mymedi-title">MYMEDI</h2>
      <form onSubmit={handleLogin}>
        <input
          className="input-field-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field-passwd"
          type="password"
          placeholder="Passwword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="save-login">
        <input
            className="save-login-info"
            type="checkbox"
            checked={saveIDFlag}
            onChange={handleSaveIDFlag}
          />
          
          <label>로그인 정보 저장</label>
        </div>
        
        <button className="login-btn" type="submit">로그인</button>
        <p className="ask-signup">
          아직 회원이 아닌가요? <span className="signup-link" onClick={() => navigate("/signup")}>회원가입</span>
        </p>
      </form>
    </div>
  );
};


export default Login;