import React from "react";
import styled from "@emotion/styled";

function Header() {
  return (
    <HeaderBlock>
      <div className="headerTitles">
        <div className="headerTitleSm">아기를 위한 정확한 정보</div>
        <div className="headerTitleLg">For My Baby</div>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt=""
      />
    </HeaderBlock>
  );
}

const HeaderBlock = styled.div`
  margin-top: 5rem;
  font-family: "Gamja Flower", cursive;

  .headerTitles {
    display: flex;
    flex-direction: column;
    color: #444;
    align-items: center;
  }

  .headerTitleSm {
    font-size: 2rem;
    position: absolute;
    top: 13%;
  }
  .headerTitleLg {
    font-size: 10rem;
    position: absolute;
    top: 15%;
  }

  .headerImg {
    width: 100%;
    margin-top: 7rem;
    object-fit: cover;
    height: 100rem;
  }

  @media (max-width: 80rem) {
    .headerTitles {
      display: flex;
      flex-direction: column;
      color: #444;
      align-items: center;
    }

    .headerTitleSm {
      font-size: 2.3rem;
      position: absolute;
      top: 13%;
    }

    .headerTitleLg {
      font-size: 6rem;
      position: absolute;
      top: 17%;
    }

    .headerImg {
      object-fit: contain;
      width: 100%;
      height: 100%;
      margin-top: 5.6rem;
    }
  }
`;

export default Header;
