import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import member from "../reducers/member";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";
import { questions } from "../reducers/questions";
import styled from "styled-components";
import Timer from "./Timer";

import { GP, DLBtn, Button, FetchBtn, AnswerBtn, QuestionB } from "./Themes";

// import { counter } from "../reducers/counter";

// import GameCard from "./GameCard";

const GameBoard = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    color: ${(props) => props.theme.titleColor};
  }
`;

const TimeAndQ = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
  color: ${(props) => props.theme.titleColor};
  font-size: 20px;
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  color: ${(props) => props.theme.titleColor};
`;

const Game = (props) => {
  const [start, setStart] = useState(false);
  // const [amountOfQuestions, setAmountOfQuestions] = useState(24);
  const accessToken = useSelector((store) => store.member.accessToken);
  const ques = useSelector((store) => store.questions.questionList);
  const amountOfQ = useSelector((store) => store.questions.amountOfQuestions);
  // const questions = useSelector((store) => store.questions.questions);

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

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <GP>
      <Button onClick={logout}>Sign out!</Button>
      <DLBtn onClick={changeTheme}>Dark/light</DLBtn>
      <GameBoard>
        <Button onClick={exitGame}>Exit game</Button>
        <TimeAndQ>
          {start === true && <Timer />}
          <p>You have {amountOfQ} Q's left</p>
          {/* <Timer /> */}
        </TimeAndQ>
        <h1>QuizTime</h1>
        {!start && (
          <Button
            onClick={() => {
              setStart(true);
            }}
          >
            Start the game
          </Button>
        )}
        {/* <GameCard /> */}

        {start === true && (
          <GameCard>
            <div>
              <FetchBtn
                onClick={() => {
                  dispatch(fetchEasyQuestions());
                  // setAmountOfQuestions(amountOfQuestions - 1);
                }}
              >
                Easy Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  dispatch(fetchMiddleQuestions());
                  // setAmountOfQuestions(amountOfQuestions - 2);
                }}
              >
                Middle Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  dispatch(fetchHardQuestions());
                  // setAmountOfQuestions(amountOfQuestions - 4);
                }}
              >
                Hard Questions
              </FetchBtn>
            </div>
            <div>
              <QuestionB>{ques.question}</QuestionB>
              {ques?.options?.map((answer, index) => (
                <AnswerBtn
                  key={answer}
                  onClick={() => onAnswerSubmit(ques._id, index)}
                >
                  {answer}
                </AnswerBtn>
              ))}
            </div>
          </GameCard>
        )}
      </GameBoard>
    </GP>
  );
};

export default Game;
