import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userid: "",
    nickname: "",
    username: "",
    password: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
      // toast.success(`반갑습니다 ${user.username}님! 회원가입 되었습니다.`);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { userid, nickname, username, password, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const imageSelectHandler = async (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userid,
      nickname,
      username,
      password,
      email,
    };
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post("/api/images/upload", formData);
        userData.profilePicture = res.data.key;
        console.log({ res: res });
      } catch (err) {
        console.log(err);
      }
    }
    console.log("userData :", userData);
    dispatch(register(userData));
  };

  const previewImages = <img src={imgSrc} className="profile-image" />;

  return (
    <RegisterBlock>
      <div className="pageTitle">
        <div className="registerTitle">회원가입</div>
        <div className="register-subTitle">일반회원</div>
      </div>
      <form className="registerForm" onSubmit={handleSubmit}>
        {" "}
        <div className="register-list">
          <label className="register-info">이름</label>
          <input
            type="text"
            className="register-input"
            id="username"
            name="username"
            placeholder="이름을 입력하세요"
            onChange={onChange}
          />
        </div>{" "}
        <div className="register-list">
          <label className="register-info">이메일</label>
          <input
            type="text"
            className="register-input"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={onChange}
          />
        </div>
        <div className="register-list">
          <label className="register-info">아이디</label>
          <input
            type="text"
            className="register-input"
            id="userid"
            name="userid"
            placeholder="ID를 입력하세요"
            onChange={onChange}
          />
        </div>
        <div className="register-list">
          <label className="register-info">닉네임</label>
          <input
            type="text"
            className="register-input"
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
          />
        </div>
        <div className="register-list">
          <label className="register-info">비밀번호</label>
          <input
            type="password"
            className="register-input"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
          />
        </div>{" "}
        <div className="register-list">
          <label className="register-info">프로필 사진</label>
          <label htmlFor="profile-input" className="profile-input1">
            {file ? (
              <div></div>
            ) : (
              <div>
                <i className="fa-regular fa-image upload-profile-img"></i>
              </div>
            )}
          </label>
          <input
            type="file"
            className="profile-input"
            id="profile-input"
            style={{ display: "none" }}
            onChange={imageSelectHandler}
          />
          {file && <div className="preview-image">{previewImages}</div>}
          <button className="registerButton" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </RegisterBlock>
  );
}

const RegisterBlock = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  .pageTitle {
    /* border: 1px solid black; */
    margin-top: 5rem;
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .registerTitle {
    font-size: 4rem;
    font-weight: bold;
  }

  .register-subTitle {
    font-size: 2rem;
    margin-top: 2rem;
    color: #f06210;
    font-weight: bold;
  }

  .registerForm {
    width: 80rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register-list {
    display: flex;
    width: 40rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.164);
    justify-content: space-between;
  }

  .register-list:nth-child(1) {
    margin-top: 2rem;
  }

  .register-info {
    display: flex;
    align-items: center;
    min-width: 10rem;
    height: 4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }

  .register-input {
    display: flex;
    align-items: center;
    width: 25rem;
    border: 1px solid rgba(0, 0, 0, 0.164);
    border-radius: 1.1rem;
    padding: 1rem;
  }

  .register-input:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  }

  .register-input:focus {
    outline: none;
    outline: 3px solid rgba(255, 0, 0, 0.589);
  }

  .preview-image {
    display: flex;
    flex: 1;
    border: 1px solid;
    height: 20rem;
    object-fit: cover;
  }

  .profile-image{
    width: 100%;
  }

  .upload-profile-img {
    font-size: 5rem;
  }
`;

export default Register;
