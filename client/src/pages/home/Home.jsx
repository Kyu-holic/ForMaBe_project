import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../context/SearchContext";
import { getPostsBySearchText } from "../../api/post";
import { getPost } from "../../post/postSlice";

function Home() {
  // 특정 유저의 글만 불러오는 방법
  // const { search } = useLocation();

  const { posts, keyword } = useSelector((state) => state.post);
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const postsResponse = await getPostsBySearchText(search);
    //   setSearchedPosts(postsResponse);
    // };
    // fetchPosts();
    console.log("before Dispatch: ");
    // console.log("keyword:", keyword.payload);
    dispatch(getPost(keyword.payload));
  }, [keyword.payload]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts searchedPosts={posts} />
      </div>
    </div>
  );
}

export default Home;
