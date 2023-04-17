import React from "react";
import Post from "../Post/Post";
import styled from "@emotion/styled";

function Posts({ searchedPosts }) {
  return (
    <PostsBlock>
      {searchedPosts.map((searchedPost, index) => (
        <Post searchedPost={searchedPost} key={index} />
      ))}
    </PostsBlock>
  );
}

const PostsBlock = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
`;

export default Posts;
