import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import member from "../reducers/member";
import { questions } from "../reducers/questions";
import { fetchQuestions } from "../reducers/questions";

import Timer from "./Timer";

import styled from "styled-components";
import {
  GP,
  DLToggle,
  Button,
  StartButton,
  FetchBtn,
  AnswerBtn,
  QuestionB,
} from "./Themes";

const GameBoard = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    color: ${(props) => props.theme.titleColor};
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 24px;
    }
  }
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;

  @media (max-width: 700px) {
    width: 100px;
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
  align-items: center;
  color: ${(props) => props.theme.titleColor};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Game = (props) => {
  const [start, setStart] = useState(false);
  const [showQues, setShowQues] = useState(false);

  const accessToken = useSelector((store) => store.member.accessToken);
  const ques = useSelector((store) => store.questions.questionList);

  const minsSecs = { minutes: 3, seconds: 10 };

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
    navigate("/profile");
    console.log("gameover");
  };

  const chooseLevel = (level) => {
    dispatch(fetchQuestions(level));
  };

  const onAnswerSubmit = (_id, index) => {
    dispatch(
      questions.actions.submitAnswer({
        questionId: _id,
        answerIndex: index,
      }),
      questions.actions.setSteps()
    );
    setShowQues(false);
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
      <MenuBox>
        <Button onClick={logout}>Sign out!</Button>
        <DLToggle>
          <input type="checkbox" onClick={changeTheme} />
          <span></span>
          <p>Dark/light</p>
        </DLToggle>
      </MenuBox>
      <GameBoard>
        <Button onClick={exitGame}>Exit game</Button>
        <TimeAndQ>{start === true && <Timer minsSecs={minsSecs} />}</TimeAndQ>
        <h1>QuizTime</h1>
        {!start && (
          <StartButton
            onClick={() => {
              setStart(true);
            }}
          >
            Start the game
          </StartButton>
        )}

        {start === true && (
          <GameCard>
            <div>
              <FetchBtn
                onClick={() => {
                  chooseLevel("questions?level=1");
                  dispatch(questions.actions.setAmountOfQuestions1());
                  setShowQues(true);
                }}
              >
                Easy Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  chooseLevel("questions?level=2");
                  dispatch(questions.actions.setAmountOfQuestions2());
                  setShowQues(true);
                }}
              >
                Middle Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  chooseLevel("questions?level=4");
                  dispatch(questions.actions.setAmountOfQuestions4());
                  setShowQues(true);
                }}
              >
                Hard Questions
              </FetchBtn>
            </div>
            {showQues && (
              <div>
                <QuestionB>{ques.question}</QuestionB>
                <ButtonBox>
                  {ques?.options?.map((answer, index) => (
                    <AnswerBtn
                      key={answer}
                      onClick={() => onAnswerSubmit(ques._id, index)}
                    >
                      {answer}
                    </AnswerBtn>
                  ))}
                </ButtonBox>
              </div>
            )}
          </GameCard>
        )}
      </GameBoard>
    </GP>
  );
};

export default Game;
