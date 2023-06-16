import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  console.log("user :", user);

  return (
    <ProfileBlock>
      <div className="profile">
        <div className="profile-left">
          <div className="profile-summary">
            <img
              className="profile-picture"
              src={`http://localhost:5000/images/${user.profilePicture}`}
            />
            <div className="profile-name">{user.username}</div>
            <div className="profile-email">{user.nickname}</div>
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-box">
            <div className="profile-title">내 프로필</div>
            <ul className="profile-detail">
              <li>
                <i className="fa-regular fa-user profile-icon"></i>
                {user.username}
              </li>
              <li>
                <i className="fa-regular fa-envelope profile-icon"></i>
                {user.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ProfileBlock>
  );
}

const ProfileBlock = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  height: 60rem;

  .profile {
    /* border: 1px solid blue; */
    width: 100rem;
    height: 50rem;
    margin-top: 4rem;
    display: flex;
  }

  .profile-left {
    flex: 3;
    /* border: 1px solid red; */
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-summary {
    /* border: 1px solid blue; */
    flex-direction: column;
    width: 100%;
    height: 24.8rem;
    text-align: center;
    box-shadow: 0.5rem 0.5rem 1rem #777;
    padding: 3rem;
    box-sizing: border-box;
    border-radius: 2rem;
  }

  .profile-picture {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-name {
    margin-top: 3rem;
    font-size: 3rem;
    font-weight: bold;
  }

  .profile-email {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: gray;
  }

  .profile-right {
    flex: 6;
    height: 100%;
    /* border: 1px solid orange; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-box {
    display: block;
    width: 50rem;
  }

  .profile-title {
    position: relative;
    display: block;
    padding: 15px 38px 13px 18px;
    border-radius: 12px 12px 0 0;
    background-image: linear-gradient(98deg, #03c75a, #49c6dd);
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }

  .profile-icon {
    margin-right: 1rem;
    color: gray;
  }

  .profile-detail {
    padding: 0 17px;
    border-radius: 0 0 1.2rem 1.2rem;
    box-shadow: 1px 1px 10px 0 rgba(72, 75, 108, 0.08);
    border: solid 1px #c9cdcf;
    background-color: #fff;
    box-sizing: border-box;
    height: 20rem;
  }

  .profile-detail li {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #d4d2d2;
    padding-bottom: 1rem;
  }

  .profile-detail li:nth-child(1) {
    margin-top: 1.5rem;
  }

  @media (max-width: 800px) {
  }
`;

export default Profile;
