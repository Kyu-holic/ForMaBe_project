import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styled from "@emotion/styled";
import { SearchContext } from "../../context/SearchContext";
import { toast } from "react-toastify";
import { userLogout } from "../../api/post";

function Topbar() {
  const { user, dispatch } = useContext(UserContext);
  const { posts, copy, setSearchKeyword } = useContext(SearchContext);

  const onSearchHandler = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onLogoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    userLogout();
    toast.success("로그아웃 되었습니다.");
  };

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <TopbarBlock>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topBarList">
          <Link className="link" to="/" onClick={() => window.scrollTo(0, 0)}>
            <li className="topListItems">HOME</li>
          </Link>
          <Link className="link" to="/about">
            <li className="topListItems">ABOUT</li>
          </Link>
          {user && user.role === 1 ? (
            <Link className="link" to="/write">
              <li className="topListItems">WRITE</li>
            </Link>
          ) : user === null || user.role !== 1 ? (
            <p></p>
          ) : (
            <p></p>
          )}
          {user ? (
            <li className="topListItems" onClick={onLogoutHandler}>
              LOGOUT
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <img
            className="profileImg"
            src="https://file.mk.co.kr/meet/neds/2020/02/image_readtop_2020_212162_15829575334105957.jpg"
          />
        ) : (
          <ul className="topBarList">
            <Link className="link" to="/login">
              <li className="topListItems">LOGIN</li>
            </Link>
            <Link className="link" to="/register">
              <li className="topListItems">REGISTER</li>
            </Link>
          </ul>
        )}
        <div className="search">
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
          <input
            className="search-box"
            type="text"
            placeholder="키워드를 검색하세요"
            onChange={onSearchHandler}
          />
        </div>
      </div>
    </TopbarBlock>
  );
}

const TopbarBlock = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: white;
  z-index: 999;
  position: sticky;
  top: 0;

  .topLeft,
  .topRight {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .topCenter {
    flex: 6;
  }

  .topBarList {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .topListItems {
    font-size: 18px;
    cursor: pointer;
    margin-right: 20px;
    font-weight: 300;
  }

  .topIcon {
    margin-right: 10px;
    font-size: 20px;
    color: #444;
    cursor: pointer;
  }

  .profileImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }

  .topSearchIcon {
    font-size: 20px;
  }

  .search {
    width: 250px;
    display: flex;
    align-items: center;
    background-color: rgba(211, 211, 211, 0.311);
    border-radius: 10px;
    padding: 5px;
  }

  .search-box {
    width: 200px;
    height: 30px;
    border: none;
    background: transparent;
  }
`;

export default Topbar;
