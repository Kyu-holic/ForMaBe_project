import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProfileBlock>
      <div className="profile">
        <div className="profile-left">
          <img
            className="profile-picture"
            src={`http://localhost:5000/images/${user.profilePicture}`}
          />
          <div className="profile-name">{user.name}</div>
        </div>
        <div className="profile-right"></div>
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
    border: 1px solid red;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .profile-picture {
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-name {
    margin-top: 3rem;
    font-size: 3rem;
    font-weight: bold;
  }

  .profile-right {
    flex: 6;
    height: 100%;
    border: 1px solid orange;
  }

  @media (max-width: 800px) {
  }
`;

export default Profile;
