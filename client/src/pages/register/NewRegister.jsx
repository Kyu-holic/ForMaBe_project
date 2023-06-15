import React, { useState } from "react";
import styled from "@emotion/styled";

function NewRegister() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const imageSelectHandler = async (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  const previewImages = <img src={imgSrc} className="profile-image" />;

  return (
    <RegisterBlock>
      <div className="pageTitle">
        <div className="registerTitle">회원가입</div>
        <div className="register-subTitle">일반회원</div>
      </div>
      <form className="registerForm">
        <div className="register-list">
          <label className="register-info">아이디</label>
          <input
            type="text"
            className="register-input"
            id="id"
            name="id"
            placeholder="ID를 입력하세요"
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
          />
        </div>
        <div className="register-list">
          <label className="register-info">이름</label>
          <input
            type="text"
            className="register-input"
            id="username"
            name="username"
            placeholder="이름을 입력하세요"
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
          />
        </div>{" "}
        <div className="register-list">
          <label className="register-info">프로필 사진</label>
          <label htmlFor="profile-input">
            <i class="fa-regular fa-image upload-profile-img"></i>
          </label>
          <input
            type="file"
            className="profile-input"
            id="profile-input"
            style={{ display: "none" }}
            onChange={imageSelectHandler}
          />
          {file && <div className="preview-image">{previewImages}</div>}
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
    /* width: 100%; */
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.164);
  }

  .register-list:nth-child(1) {
    margin-top: 2rem;
  }

  .register-info {
    display: flex;
    align-items: center;
    width: 10rem;
    height: 4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }

  .register-input {
    display: flex;
    align-items: center;
    width: 25rem;
    margin-left: 7rem;
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
    /* border: 1px solid black; */
    width: 10rem;
    height: 10rem;
  }

  .upload-profile-img {
    font-size: 5rem;
  }
`;

export default NewRegister;
