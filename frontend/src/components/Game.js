import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import member from "../reducers/member";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";
import styled from "styled-components";
import Timer from "./Timer";

import { counter } from "../reducers/counter";

// import GameCard from "./GameCard";

const GameBoard = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const TimeAndQ = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const Game = () => {
  // const [amountOfQuestions, setAmountOfQuestions] = useState(24);
  const accessToken = useSelector((store) => store.member.accessToken);
  const questions = useSelector((store) => store.questions.questionList);
  const amountOfQ = useSelector((store) => store.questions.amountOfQuestions);

  // const counter = useSelector((store) => store.counter.counter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const logout = () => {
    dispatch(member.actions.setAccessToken(""));
  };

  // const onButtonClick1 = () => {
  //   dispatch(fetchEasyQuestions()), setCurrentQuestion(currentQuestion + 1);
  // };

  return (
    <>
      <button onClick={logout}>Sign out!</button>
      <GameBoard>
        <TimeAndQ>
          <Timer />
          <p>You have {amountOfQ} Q's left</p>
        </TimeAndQ>
        <p>QuizTime</p>
        <button onClick={() => {}}>Start the game</button>
        {/* <GameCard/> */}

        <GameCard>
          <div>
            <button
              onClick={() => {
                dispatch(fetchEasyQuestions());
                // setAmountOfQuestions(amountOfQuestions - 1);
              }}
            >
              Easy Questions
            </button>
            <button
              onClick={() => {
                dispatch(fetchMiddleQuestions());
                // setAmountOfQuestions(amountOfQuestions - 2);
              }}
            >
              Middle Questions
            </button>
            <button
              onClick={() => {
                dispatch(fetchHardQuestions());
                // setAmountOfQuestions(amountOfQuestions - 4);
              }}
            >
              Hard Questions
            </button>
          </div>
          <div>
            <p>{questions.question}</p>
            {questions?.options?.map((answer) => (
              <button key={answer}>{answer}</button>
            ))}
          </div>
        </GameCard>
      </GameBoard>
    </>
  );
};

export default Game;
