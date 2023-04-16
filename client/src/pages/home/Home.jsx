import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { SearchContext } from "../../context/SearchContext";
import { getPostsBySearchText } from "../../api/post";

function Home() {
  // 특정 유저의 글만 불러오는 방법
  const { search } = useLocation();
  const { searchedPosts, setSearchedPosts } = useContext(SearchContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsResponse = await getPostsBySearchText(search);
      setSearchedPosts(postsResponse);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts searchedPosts={searchedPosts} />
      </div>
    </div>
  );
}

export default Home;
