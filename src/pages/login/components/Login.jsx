import "../styles/Login.css";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [saveIDFlag, setSaveIDFlag] = useState(false);

    const { login, loading } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

  return (
    <div className="login-container">
      <h2 className="mymedi-title">MYMEDI</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={() => setSaveIDFlag((prev) => !prev)}
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