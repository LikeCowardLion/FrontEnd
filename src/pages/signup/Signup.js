import React, { useState } from "react";
import "../signup/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("남");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 간단 유효성 검사 후 회원가입 처리
    alert("회원가입 성공!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">MYMEDI</h2>
      <form onSubmit={handleSubmit}>
        <p className="text-field">닉네임 </p>
        <input
          className="input-field"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <p className="text-field">이메일 주소</p>
        <div className="email-check-container">
          <input
            className="email-input-field"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="check-button">중복확인</button>
        </div>

        <p className="text-field">비밀번호</p>
        <input
          className="pswd-input-field"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="s-text-field">영문, 숫자, 특수문자 조합 최소 8자리 이상</p>

        <p className="text-field">비밀번호 확인</p>
        <input
          className="input-field"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p className="text-field">나이</p>
        <div className="row-group">
          <input
            className="age-input-field"
            type="number"
            placeholder="세"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="gender-group">
            <button
              type="button"
              className={gender === "남" ? "gender selected" : "gender"}
              onClick={() => setGender("남")}
            >
              남
            </button>
            <button
              type="button"
              className={gender === "여" ? "gender selected" : "gender"}
              onClick={() => setGender("여")}
            >
              여
            </button>
          </div>
        </div>

        <p className="text-field">키/몸무게</p>
        <div className="body-row-group">
          <input
            className="body-input-field"
            type="text"
            placeholder="cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input
            className="body-input-field"
            type="text"
            placeholder="kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="signup-buttons">
          <button type="button" className="cancel-button" onClick={() => navigate("/login")}>취소</button>
          <button type="submit" className="signup-button">회원가입</button>
        </div>
        <p className="already-member">
          이미 계정이 있으신가요? <span className="login-link" onClick={() => navigate("/login")}>로그인</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
