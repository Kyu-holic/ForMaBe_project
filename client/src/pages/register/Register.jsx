import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { toast } from "react-toastify";
import axios from "axios";
import { userRegister } from "../../api/post";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username.length < 2)
        throw new Error(
          "username이 너무 짧습니다. 두 글자 이상으로 해주세요. "
        );
      if (password.length < 6)
        throw new Error(
          "비밀번호가 너무 짧습니다. 여섯글자 이상으로 해주세요."
        );
      await userRegister(username, email, password);
      navigate("/");
      toast.success("회원가입 되었습니다.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="username을 입력하세요"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="registerButton" type="submit">
          register
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
}

export default Register;
