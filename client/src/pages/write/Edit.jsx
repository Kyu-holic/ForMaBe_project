import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "@emotion/styled";

function Edit() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { id } = useParams();

  console.log("id:", id);

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

  // useEffect(() => {
  //   const getPost = async () => {
  //     const res = await axios.get(`/posts/${path}`);
  //     setPost(res.data);
  //   };
  //   getPost();
  // }, [path]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      console.log(res);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, []);

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
            value={title}
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
          {title && (
            <Editor value={desc} setDesc={setDesc} setImage={setImage} />
          )}
        </div>
        <button className="writeSubmit" type="submit">
          등록
        </button>
      </form>
    </WriteBlock>
  );
}

const WriteBlock = styled.div`
  padding-top: 5rem;

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
    width: 60rem;
    height: 30rem;
    border-radius: 1rem;
  }

  .writeFormGroup {
    margin-left: 15rem;
    display: flex;
    align-items: center;
    margin-top: 3rem;
  }

  .writeIcon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 0.1rem solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: gray;
  }

  .writeInput {
    font-size: 3rem;
    border: none;
    padding: 2rem;
    width: 70vw;
  }

  .writeInput:focus {
    outline: none;
  }

  .writeText {
    font-size: 2rem;
  }

  .writeSubmit {
    position: absolute;
    top: 2rem;
    right: 5rem;
    color: white;
    background-color: teal;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    font-size: 1.6rem;
  }
`;

export default Edit;
