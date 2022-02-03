import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { DLToggle, Button } from "./Themes";
import { questions } from "../reducers/questions";
import { API_URL } from "../utils/constants";

const GoalBoard = styled.main`
  background-image: ${(props) => props.theme.scoreBoardBg};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    align-self: flex-start;
  }

  h1 p {
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

const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.infoBg};
  width: 500px;
  border-radius: 6px;
`;

const Goal = (props) => {
  const answers = useSelector((store) => store.questions.answers);
  const accessToken = useSelector((store) => store.member.accessToken);
  const username = useSelector((store) => store.member.username);
  const time = useSelector((store) => store.questions.time);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onButtonSubmit = (event) => {
    console.log(username, answers.length, time);

    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, answers: answers.length, time: time }),
      // ska byta time till currentTime
    };

    fetch(API_URL("results"), options)
      .then((res) => res.json())
      .then((data) => console.log("posting", data));

    // dispatch(questions.actions.gameOver());
    // navigate("/profile");
  };

  //här vill jag subimtta resutltatet till api. Så en json post OCH gå tillbaka till profil.

  return (
    <GoalBoard>
      <Link to="/profile">Go back to profile</Link>
      <DLToggle>
        <input type="checkbox" onClick={changeTheme} />
        <span></span>
        <p>Dark/light</p>
      </DLToggle>
      <ResultsInfo>
        <h1>Woho! {username} you made it!</h1>
        <p>You reached the goal by answering {answers.length} questions!</p>
        <p>And in {time} time!</p>
        {/* ska vara currentTime sen */}
      </ResultsInfo>
      <Button onClick={onButtonSubmit}>Go back to profile</Button>
    </GoalBoard>
  );
};

export default Goal;
