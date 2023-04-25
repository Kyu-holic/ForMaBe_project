import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../auth/authSlice";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

function Login() {
  // const userRef = useRef();
  // const passwordRef = useRef();
  // const { dispatch, isFetching } = useContext(UserContext);
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const res = await userLogin(userRef, passwordRef);
  //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  //     navigate("/");
  //     toast.success("로그인 되었습니다.");
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({ type: "LOGIN_FAILURE" });
  //     toast.error("입력하신 정보가 틀렸습니다.");
  //   }
  // };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <Loginblock>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginInfo">Username</label>
        {/* <input
          className="loginInput"
          type="text"
          placeholder="유저네임을 입력하세요"
          ref={userRef}
        /> */}
        <input
          type="text"
          className="loginInput"
          id="name"
          name="username"
          placeholder="유저네임을 입력하세요"
          onChange={onChange}
        />
        <label className="loginInfo">Password</label>
        {/* <input
          className="loginInput"
          type="password"
          placeholder="비밀번호를 입력하세요"
          ref={passwordRef}
        /> */}
        <input
          type="password"
          className="loginInput"
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </Loginblock>
  );
}

const Loginblock = styled.div`
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f6f6;

  .loginTitle {
    font-size: 5rem;
  }

  .loginInfo {
    font-size: 1.5rem;
  }

  .loginForm {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .loginForm > label {
    margin: 1rem 0;
  }

  .loginInput {
    padding: 1rem;
    background-color: white;
    border: none;
  }

  .loginButton {
    margin-top: 2rem;
    cursor: pointer;
    background-color: lightcoral;
    border: none;
    color: white;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
  }

  .loginButton:disabled {
    cursor: not-allowed;
    background-color: coral;
  }

  .loginRegisterButton {
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

export default Login;
