import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import "./post.css";

function Post({ searchedPost }) {
  const html = searchedPost.desc;
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  const result = dom.documentElement.textContent;

  return (
    <div className="post">
      <Link to={`/post/${searchedPost._id}`} className="link">
        <img
          src={`http://localhost:5000/images/${searchedPost.photo}`}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <div className="postInfo">
          <h2 className="postTitle">{searchedPost.title}</h2>
          <div className="postDate">
            {new Date(searchedPost.updatedAt).toDateString}
          </div>
        </div>
        <div className="postDesc">{ReactHtmlParser(result)}</div>
      </Link>
    </div>
  );
}

export default Post;
