import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userRegister } from "../../api/post";
import { register, reset } from "../../auth/authSlice";
import styled from "@emotion/styled";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (username.length < 2)
  //       throw new Error(
  //         "username이 너무 짧습니다. 두 글자 이상으로 해주세요. "
  //       );
  //     if (password.length < 6)
  //       throw new Error(
  //         "비밀번호가 너무 짧습니다. 여섯글자 이상으로 해주세요."
  //       );
  //     await userRegister(username, email, password);
  //     navigate("/");
  //     toast.success("회원가입 되었습니다.");
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <RegisterBlock>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label className="registerInfo">Username</label>
        <input
          type="text"
          className="registerInput"
          id="name"
          name="username"
          placeholder="username을 입력하세요"
          onChange={onChange}
          // className="registerInput"
          // type="text"
          // placeholder="username을 입력하세요"
          // onChange={(e) => {
          //   setUsername(e.target.value);
          // }}
        />
        <label className="registerInfo">Email</label>
        <input
          type="email"
          className="registerInput"
          id="email"
          name="email"
          placeholder="email을 입력하세요"
          onChange={onChange}
        />
        {/* <input
          className="registerInput"
          type="text"
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        /> */}
        <label className="registerInfo">Password</label>
        <input
          type="password"
          className="registerInput"
          id="password"
          name="password"
          placeholder="password를 입력하세요"
          onChange={onChange}
        />
        {/* <input
          className="registerInput"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
        <button className="registerButton" type="submit">
          register
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
    </RegisterBlock>
  );
}

const RegisterBlock = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f6f6;

  .registerTitle {
    font-size: 5rem;
  }

  .registerInfo {
    font-size: 1.5rem;
  }

  .registerForm {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .registerForm > label {
    margin: 1rem 0;
  }

  .registerInput {
    padding: 1rem;
    background-color: white;
    border: none;
  }

  .registerButton {
    margin-top: 2rem;
    cursor: pointer;
    background-color: lightcoral;
    border: none;
    color: white;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.6rem;
  }

  .registerLoginButton {
    position: absolute;
    font-size: 1.5rem;
    top: 6rem;
    right: 2rem;
    background-color: teal;
    padding: 1rem;
    border-radius: 1rem;
    color: white;
  }
`;

export default Register;
