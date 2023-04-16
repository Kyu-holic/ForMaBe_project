import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <div className="headerTitleSm">아기를 위한 정확한 정보</div>
        <div className="headerTitleLg">For My Baby</div>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt=""
      />
    </div>
  );
}

export default Header;
