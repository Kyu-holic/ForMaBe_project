import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const { user } = useContext(UserContext);
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
    <div className="write">
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
    </div>
  );
}

export default Write;
