import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import member from "../reducers/member";
import { questions } from "../reducers/questions";
import { fetchQuestions } from "../reducers/questions";

import Timer from "./Timer";

import styled from "styled-components";
import { GP, DLBtn, Button, FetchBtn, AnswerBtn, QuestionB } from "./Themes";

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
  const [queLeft, setQueLeft] = useState();
  const accessToken = useSelector((store) => store.member.accessToken);
  const ques = useSelector((store) => store.questions.questionList);
  let questionsLeft = useSelector((store) => store.questions.amountOfQuestions);
  // const steps = useSelector((store) => store.questions.steps);
  console.log("amount", questionsLeft);
  const ans = useSelector((store) => store.questions.answers);
  console.log("answers", ans);
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
      <Button onClick={logout}>Sign out!</Button>

      <DLBtn onClick={changeTheme}>Dark/light</DLBtn>
      <GameBoard>
        <Button onClick={exitGame}>Exit game</Button>
        <TimeAndQ>{start === true && <Timer />}</TimeAndQ>
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
                  chooseLevel("questions?level=1");
                  setShowQues(true);
                }}
              >
                Easy Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  chooseLevel("questions?level=2");
                  setShowQues(true);
                }}
              >
                Middle Questions
              </FetchBtn>
              <FetchBtn
                onClick={() => {
                  chooseLevel("questions?level=4");
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
            ,
          </GameCard>
        )}
      </GameBoard>
    </GP>
  );
};

export default Game;
