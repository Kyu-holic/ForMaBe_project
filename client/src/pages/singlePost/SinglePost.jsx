import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import "./singlePost.css";
import { UserContext } from "../../context/UserContext";

function SinglePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState("");
  const { user } = useContext(UserContext);

  const onDeleteHandler = async () => {
    try {
      await axios.delete(`/posts/${path}`, {
        data: { username: user.username },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`http://localhost:5000/images/${post.photo}`}
        />
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i className="singlePostIcon fa-regular fa-pen-to-square"></i>{" "}
              <i
                className="singlePostIcon fa-regular fa-trash-can"
                onClick={onDeleteHandler}
              ></i>
            </div>
          )}
        </h1>
      </div>
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          작성자 :
          <Link to={`/?user=${post.username}`} className="link">
            <b> {post.username}</b>
          </Link>
        </span>
        <span className="singlePostDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="singlePostDesc">{ReactHtmlParser(post.desc)}</p>
    </div>
  );
}

export default SinglePost;
