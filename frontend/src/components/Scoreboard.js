import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DLToggle } from "./Themes";

const ScorBoard = styled.main`
  background-image: ${(props) => props.theme.scoreBoardBg};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
    text-align: center;
    width: 150px;
  }

  h1 {
    text-align: center;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 20px;
    }

    a {
      padding: 5px;
      font-size: 12px;
      width: 90px;
      margin: 5px;
    }
  }
`;

const Scoreboard = (props) => {
  const accessToken = useSelector((store) => store.member.accessToken);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <ScorBoard>
      <Link to="/profile">Go back to profile</Link>
      <DLToggle>
        <input type="checkbox" onClick={changeTheme} />
        <span></span>
        <p>Dark/light</p>
      </DLToggle>
      <h1>Scoreboard</h1>
    </ScorBoard>
  );
};

export default Scoreboard;
