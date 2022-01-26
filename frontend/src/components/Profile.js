import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import member from "../reducers/member";
import styled from "styled-components";
import Rules from "./Rules";
import { DLBtn, GP, Button } from "./Themes";

const ProfileMain = styled.section`
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.aside`
  display: flex;
  flex-direction: column;
  width: 140px;

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 1em;
    margin: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: Oswald;
    text-align: center;
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
  color: ${(props) => props.theme.titleColor};

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 1em;
    margin: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: Oswald;
  }
`;

const AvatarPic = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: grey;
  border-radius: 50%;
`;

const Profile = (props) => {
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

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <GP>
      <InfoBox>
        <Button onClick={logout}>Sign out!</Button>
        <DLBtn onClick={changeTheme}>Dark/light</DLBtn>
        <Button onClick={toggleRules}>RULES</Button>
        {rules && <Rules handleClose={toggleRules} />}
        <Link to="/scoreboard">Scoreboard</Link>
      </InfoBox>
      <ProfileMain>
        <ProfileBox>
          <AvatarPic></AvatarPic>
          <h1>Welcome {username} to your gamepage</h1>
          <Link to="/game">Lets start the game</Link>
        </ProfileBox>
      </ProfileMain>
    </GP>
  );
};

export default Profile;
