import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { SearchContext } from "../../context/SearchContext(지울예정)";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../auth/authSlice";
import { setKeyword } from "../../post/postSlice";
import postReducer from "../../post/postSlice";

function Topbar() {
  // const { setSearchKeyword } = useContext(SearchContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const onSearchHandler = (e) => {
    // setSearchKeyword(e.target.value);
    // console.log("postReducer", postReducer);
    dispatch(setKeyword(e.target.value));
  };

  const onLogoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success("로그아웃 되었습니다.");
  };

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  // console.log("user :", user);

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
  height: 6rem;
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
    font-size: 1.8rem;
    cursor: pointer;
    margin-right: 2rem;
    font-weight: 300;
  }

  .topIcon {
    margin-right: 1rem;
    font-size: 2rem;
    color: #444;
    cursor: pointer;
  }

  .profileImg {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1.5rem;
  }

  .topSearchIcon {
    font-size: 2rem;
  }

  .search {
    width: 25rem;
    display: flex;
    align-items: center;
    background-color: rgba(211, 211, 211, 0.311);
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .search-box {
    width: 20rem;
    height: 3rem;
    border: none;
    background: transparent;
  }

  @media (max-width: 800px) {
    width: 100%;

    .topListItems {
      font-size: 1rem;
    }

    .topIcon,
    .profileImg {
      display: none;
    }

    .topCenter,
    .topRight {
    }

    .search {
      width: 15rem;
    }
    .search-box {
      width: 100%;
    }
  }
`;

export default Topbar;
