import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "@emotion/styled";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const imageSelectHandler = async (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post("/images/upload", formData);
        newPost.photo = res.data.key;
        console.log({ res: res });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const previewImages = <img src={imgSrc} className="writeImg" />;

  return (
    <WriteBlock>
      {file && <div className="previewImg-box">{previewImages}</div>}

      <form className="writeForm" onSubmit={submitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={imageSelectHandler}
          />
          <input
            type="text"
            placeholder="제목"
            className="writeInput"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          {/* <textarea
            placeholder="내용을 입력하세요"
            type="text"
            className="writeInput writeText"
          ></textarea> */}
          <Editor setDesc={setDesc} setImage={setImage} />
        </div>
        <button className="writeSubmit" type="submit">
          등록
        </button>
      </form>
    </WriteBlock>
  );
}

const WriteBlock = styled.div`
  padding-top: 50px;

  .writeForm {
    position: relative;
  }

  .previewImg-box {
    display: flex;
    justify-content: center;
  }

  .writeImg {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 300px;
    border-radius: 10px;
  }

  .writeFormGroup {
    margin-left: 150px;
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .writeIcon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: gray;
  }

  .writeInput {
    font-size: 30px;
    border: none;
    padding: 20px;
    width: 70vw;
  }

  .writeInput:focus {
    outline: none;
  }

  .writeText {
    font-size: 20px;
  }

  .writeSubmit {
    position: absolute;
    top: 20px;
    right: 50px;
    color: white;
    background-color: teal;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }
`;

export default Write;
