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
    font-family: "Inter", sans-serif;
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
  const startTime = useSelector((store) => store.questions.start);
  const finishTime = useSelector((store) => store.questions.finish);

  const timeSpent = Math.round((finishTime - startTime) / 1000);

  const minutes = Math.floor(timeSpent / 60);
  var seconds = timeSpent % 60;
  const formatted =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  console.log(formatted);

  console.log(time, startTime, finishTime);

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
    console.log(username, answers.length, formatted);

    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        answers: answers.length,
        timespent: formatted,
      }),
    };

    fetch(API_URL("results"), options)
      .then((res) => res.json())
      .then((data) => console.log("posting", data));

    dispatch(questions.actions.setTime());
    dispatch(questions.actions.gameOver());
    navigate("/profile");
  };

  return (
    <GoalBoard>
      <Link to="/profile" onClick={onButtonSubmit}>
        Go back to profile
      </Link>
      <DLToggle>
        <input type="checkbox" onClick={changeTheme} />
        <span></span>
        <p>Dark/light</p>
      </DLToggle>
      <ResultsInfo>
        <h1>Woho! {username} you made it!</h1>
        <p>You reached the goal by answering {answers.length} questions!</p>
        <p>And in {formatted} time!</p>
      </ResultsInfo>
      <Button onClick={onButtonSubmit}>Go back to profile</Button>
    </GoalBoard>
  );
};

export default Goal;
