import React from "react";
import Post from "../Post/Post";
import "./posts.css";

function Posts({ searchedPosts }) {
  return (
    <div className="posts">
      {searchedPosts.map((searchedPost, index) => (
        <Post searchedPost={searchedPost} key={index} />
      ))}
    </div>
  );
}

export default Posts;
