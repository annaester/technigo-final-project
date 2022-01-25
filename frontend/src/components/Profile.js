import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import member from "../reducers/member";
import styled from "styled-components";
import Rules from "./Rules";

const ProfileHeader = styled.header`
  button {
    margin: 20px;
  }
`;

const ProfileMain = styled.section`
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100px;

  a {
    margin-left: 20px;
  }

  button {
    margin-left: 20px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AvatarPic = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: grey;
  border-radius: 50%;
`;

const Profile = () => {
  const [rules, setRules] = useState(false);

  const accessToken = useSelector((store) => store.member.accessToken);
  const username = useSelector((store) => store.member.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleRules = () => {
    setRules(!rules);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const logout = () => {
    dispatch(member.actions.setAccessToken(""));
  };

  return (
    <>
      <ProfileHeader>
        <button onClick={logout}>Sign out!</button>
      </ProfileHeader>{" "}
      <InfoBox>
        <button onClick={toggleRules}>RULES</button>
        {rules && <Rules handleClose={toggleRules} />}
        <Link to="/scoreboard">scoreboard</Link>
      </InfoBox>
      <ProfileMain>
        <ProfileBox>
          <AvatarPic></AvatarPic>
          <h1>Welcome {username} to your gamepage</h1>
          <Link to="/game">Lets start the game</Link>
        </ProfileBox>
      </ProfileMain>
    </>
  );
};

export default Profile;
