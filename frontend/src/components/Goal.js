import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { DLToggle, Button } from "./Themes";
import { questions } from "../reducers/questions";
import { API_URL } from "../utils/constants";
import { HeaderBox } from "./Themes";

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
  font-family: "Inter", sans-serif;

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 16px;
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: "Inter", sans-serif;
    text-align: center;
    width: 150px;
    align-self: flex-start;

    :hover {
      cursor: pointer;
      box-shadow: ${(props) => props.theme.buttonShadow};
      transition: 0.1s;
    }
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
  background: ${(props) => props.theme.profileBackground};
  width: auto;
  border-radius: 6px;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;

  @media (max-width: 900px) {
    width: 65vw;

    h3 {
      font-size: 20px;
    }
  }
`;

const Goal = (props) => {
  const answers = useSelector((store) => store.questions.answers);
  const accessToken = useSelector((store) => store.member.accessToken);
  const username = useSelector((store) => store.member.username);
  const startTime = useSelector((store) => store.questions.start);
  const finishTime = useSelector((store) => store.questions.finish);

  const timeSpent = Math.round((finishTime - startTime) / 1000);

  const minutes = Math.floor(timeSpent / 60);
  var seconds = timeSpent % 60;
  const formatted =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

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
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        username,
        answers: answers.length,
        timespent: formatted,
      }),
    };

    fetch(API_URL("results"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(questions.actions.setTime());
          dispatch(questions.actions.gameOver());
          navigate("/profile");
        }
      });
  };

  return (
    <GoalBoard>
      <HeaderBox>
        <Link to="/profile" onClick={onButtonSubmit}>
          Go back to profile
        </Link>
        <DLToggle>
          <input type="checkbox" onClick={changeTheme} />
          <span></span>
          <p>Dark/Light</p>
        </DLToggle>
      </HeaderBox>
      <ResultsInfo>
        <h1>Woho! {username} you made it!</h1>
        <p>You reached the goal by answering {answers.length} questions!</p>
        <p>And in {formatted}</p>
        <h3>Good job!</h3>
      </ResultsInfo>
      <Button onClick={onButtonSubmit}>Go back to profile</Button>
    </GoalBoard>
  );
};

export default Goal;
