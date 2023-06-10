import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../post/postSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function SinglePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onEditHandler = async () => {
    try {
      // dispatch 만들기
      Swal.fire({
        title: "글을 수정하겠습니까?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/write/${path}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = async () => {
    try {
      // await axios.delete(`/posts/${path}`, {
      //   data: { username: user.username },
      // });
      // console.log("delete");
      Swal.fire({
        title: "글을 삭제하겠습니까?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            deletePost({
              id: path,
            })
          );
          navigate("/");
          toast.success("글이 삭제되었습니다.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${path}`);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  return (
    <SinglePostBlock>
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`/images/${post.photo}`}
        />
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i
                className="singlePostIcon fa-regular fa-pen-to-square"
                onClick={onEditHandler}
              ></i>{" "}
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
    </SinglePostBlock>
  );
}

const SinglePostBlock = styled.div`
  width: 130rem;
  margin: auto;

  font-size: 1.6rem;

  h1 {
    font-size: 3.2rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 1.873rem;
  }

  .singlePostImg {
    width: 110rem;
    height: 50rem;
    object-fit: cover;
    align-self: center;
  }

  .singlePostWrapper {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .singlePostTitle {
    text-align: center;
    margin: 1rem;
  }

  .singlePostEdit {
    float: right;
    font-size: 2rem;
    justify-content: center;
  }

  .singlePostIcon {
    color: rgb(224, 154, 25);
    cursor: pointer;
  }

  .singlePostInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .singlePostDesc {
    color: #666;
    line-height: 2;
  }

  .singlePostDesc h1 {
    text-align: center;
    color: dodgerblue;
  }

  .singlePostDesc img {
    width: 50rem;
    border-radius: 0.5rem;
    margin: auto;
    display: block;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 1rem 1rem;
    /* border: 1px solid black; */

    .singlePostImg {
      width: 100%;
      object-fit: contain;
    }

    .singlePostDesc img {
      width: 100%;
    }

    .singlePostInfo {
      margin: 0 1.5rem;
    }
  }
`;

export default SinglePost;
