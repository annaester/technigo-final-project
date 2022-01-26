import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import member from "../reducers/member";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";
// import { quiz } from "../reducers/questions";
import styled from "styled-components";
import Timer from "./Timer";

// import { counter } from "../reducers/counter";

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
  const [start, setStart] = useState(false);
  // const [amountOfQuestions, setAmountOfQuestions] = useState(24);
  const accessToken = useSelector((store) => store.member.accessToken);
  const questions = useSelector((store) => store.questions.questionList);
  const amountOfQ = useSelector((store) => store.questions.amountOfQuestions);

  // const quizStore = useSelector((store) => store.questions);
  // console.log("quizStore", quizStore);
  // const globalStore = useSelector((store) => store);
  // console.log("globalstore", globalStore);

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

  const exitGame = () => {
    dispatch(questions.actions.gameOver());
  };

  const onAnswerSubmit = (_id, index) => {
    dispatch(
      questions.actions.submitAnswer({
        questionId: _id,
        answerIndex: index,
      })
    );
  };

  return (
    <>
      <button onClick={logout}>Sign out!</button>
      <GameBoard>
        <button onClick={exitGame}>Exit game</button>
        <TimeAndQ>
          {start === true && <Timer />}
          <p>You have {amountOfQ} Q's left</p>
          {/* <Timer /> */}
        </TimeAndQ>
        <p>QuizTime</p>
        {!start && (
          <button
            onClick={() => {
              setStart(true);
            }}
          >
            Start the game
          </button>
        )}
        {/* <GameCard /> */}

        {start === true && (
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
              {questions?.options?.map((answer, index) => (
                <button
                  key={answer}
                  onClick={() => onAnswerSubmit(questions._id, index)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </GameCard>
        )}
      </GameBoard>
    </>
  );
};

export default Game;
