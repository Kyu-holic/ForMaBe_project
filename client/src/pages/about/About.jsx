import React from "react";
import styled from "@emotion/styled";

function About() {
  return (
    <AboutBlock className="about">
      <img
        className="aboutImg"
        src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80"
      />
      <div className="aboutIntro">
        <h1 className="aboutTitle">본 포스팅은 소정의 원고료를 지원받아... </h1>
        <h2 className="aboutTitle">
          저희 아기에게 써보니 OOOO 제품이 딱 맞더라구요!
          <br />
          현재 OOO에서 13,000원에...
        </h2>
        <br />
        <p className="aboutDesc">
          소중한 우리 아기를 키우면서 걱정되는 일들이 한 두가지가 아니시죠?
          <br />
          그래서 열심히 인터넷에서 검색을 해서 글을 읽다보면 마지막에 보이는 저
          익숙한 문구들..
          <br />
          지금 나에게 필요한 것은 광고가 아닌 정확한 정보인데
          <br />
          저 문구들을 보는 순간 정보의 신뢰도가 뚝 떨어집니다
          <br />
          <br />
          ForMaBe는 For My Baby를 줄인말로, 소중한 우리 아기를 위해 정확한
          정보들을
          <br />
          모아서 한 눈에 볼 수 있게 만든 사이트 입니다.
          <br />
          <br />
          ForMaBe에 올라온 글들은 운영자가 직접 찾고, 읽고, 검열을 통해 이
          사이트를 방문해 주시는 <br />
          부모님들이 정확한 정보를 찾고, 얻을 수 있게 관리하고 있습니다.
          <br />
          <br />
          운영자가 직접 읽고 필요한 정보들을 모아놓은 ForMaBe에서 많은 정보들을
          얻어가세요!
        </p>
      </div>
    </AboutBlock>
  );
}

const AboutBlock = styled.div`
  display: flex;
  font-size: 2rem;
  /* border: 1px solid black; */

  .aboutImg {
    width: 60rem;
    height: 100%;
    border-radius: 2rem;
    margin-top: 5rem;
    margin-left: 4rem;
  }

  .aboutIntro {
    margin: 1rem 15rem;
    margin-left: 3rem;
  }

  .aboutTitle {
    margin-top: 4rem;
    color: rgb(22, 160, 224);
    display: flex;
  }

  .aboutDesc {
    line-height: 1.9;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;

    font-size: 1.6rem;

    h1 {
      font-size: 3.2rem;
    }
    h2 {
      font-size: 2.4rem;
    }
    h3 {
      font-size: 1.873rem;
    }

    .aboutImg {
      width: 90%;
      object-fit: contain;
      margin: auto;
    }

    .aboutIntro {
      margin: auto;
      width: 90%;
    }
  }
`;

export default About;
