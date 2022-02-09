import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import member from "../reducers/member";
import styled from "styled-components";
import Rules from "./Rules";
import { DLToggle, GP, Button } from "./Themes";
import riddel from "../pictures/theriddle.jpeg";

const ProfileMain = styled.section`
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.aside`
  display: flex;
  flex-direction: column;
  width: 140px;
  align-items: flex-start;

  @media (max-width: 700px) {
    align-items: flex-start;
    width: 70px;
    height: 200px;
  }

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 1em;
    margin: 5px 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: "Inter", sans-serif;
    text-align: center;

    :hover {
      cursor: pointer;
      box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.8);
      transition: 0.1s;
    }

    @media (max-width: 700px) {
      font-size: 12px;
      margin: 5px;
      width: 50px;
      padding: 5px;
    }
  }

  button {
    margin-left: 20px;

    @media (max-width: 700px) {
      margin: 5px;
      width: 60px;
    }
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${(props) => props.theme.profileBackground};
  padding: 20px;
  border-radius: 12px;
  color: ${(props) => props.theme.titleColor};

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 20px;
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: Inter;

    :hover {
      cursor: pointer;
      box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.8);
      transition: 0.1s;
    }

    @media (max-width: 700px) {
      font-size: 16px;
    }
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 20px;
    }
  }
`;

const AvatarPic = styled.div`
  margin-top: 20px;
  padding: 40px;
  border-radius: 50%;
  background-image: url(${riddel});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
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
        <DLToggle>
          <input type="checkbox" onClick={changeTheme} />
          <span></span>
          <p>Dark/light</p>
        </DLToggle>
        <Button onClick={toggleRules}>RULES</Button>
        {rules && <Rules handleClose={toggleRules} />}
        <Link to="/scoreboard">Scoreboard</Link>
      </InfoBox>
      <ProfileMain>
        <ProfileBox>
          <AvatarPic></AvatarPic>
          <h1>Welcome {username} to your gamepage</h1>
          <Link to="/game">Click to go to the Quiz!</Link>
        </ProfileBox>
      </ProfileMain>
    </GP>
  );
};

export default Profile;
