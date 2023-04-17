import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import styled from "@emotion/styled";

function Post({ searchedPost }) {
  const html = searchedPost.desc;
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  const result = dom.documentElement.textContent;

  return (
    <PostBlock>
      <Link to={`/post/${searchedPost._id}`} className="link">
        <img
          src={`http://localhost:5000/images/${searchedPost.photo}`}
          className="postImg"
        />
        <div className="postInfo">
          <h2 className="postTitle">{searchedPost.title}</h2>
          <div className="postDate">
            {new Date(searchedPost.updatedAt).toDateString}
          </div>
        </div>
        <div className="postDesc">{ReactHtmlParser(result)}</div>
      </Link>
    </PostBlock>
  );
}

const PostBlock = styled.div`
  width: 50rem;
  margin: 3rem 2.5rem 4rem 2.5rem;
  font-family: "Gamja Flower", cursive;

  .postInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .postImg {
    width: 100%;
    height: 30rem;
    object-fit: cover;
    border-radius: 1rem;
  }

  .postTitle {
    margin: 1.5rem;
    font-size: 2.3rem;
    cursor: pointer;
  }

  .postDate {
    font-style: italic;
    font-size: 1.5rem;
    color: #999;
  }

  .postDesc {
    color: #444;
    font-size: 2rem;
    line-height: 2.8rem;
    margin-top: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  @media (max-width: 800px) {
    width: 100%;

    // object-fit: contain 으로 하면 border-radius 가 이상하게 먹힘
    .postImg {
      width: 100%;
      border-radius: 3rem;
      object-fit: cover;
    }

    .postTitle {
      font-size: 2.3rem;
    }
    .postDesc {
      font-size: 1.8rem;
      margin-top: 1rem;
    }
  }
`;

export default Post;
