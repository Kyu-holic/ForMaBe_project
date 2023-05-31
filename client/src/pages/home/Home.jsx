import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../context/SearchContext(지울예정)";
import { getPostsBySearchText } from "../../api/post";
import { getPost } from "../../post/postSlice";

function Home() {
  // 특정 유저의 글만 불러오는 방법
  // const { search } = useLocation();

  const { posts, keyword } = useSelector((state) => state.post);
  // console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const postsResponse = await getPostsBySearchText(search);
    //   setSearchedPosts(postsResponse);
    // };
    // fetchPosts();
    // console.log("before Dispatch: ");
    // console.log("keyword:", keyword.payload);
    // setTimeout을 통해 delay 이후에 debouncedValue를 얻습니다.
    const timer = setTimeout(() => {
      dispatch(getPost(keyword.payload));
    }, 1000);

    return () => {
      clearTimeout(timer); // 이 전의 timer를 clear합니다.
    };
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
