import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { questions } from "../reducers/questions";

const TimerDiv = styled.div`
  color: ${(props) => props.theme.titleColor};
  font-size: 20px;
`;

const Timer = () => {
  const [count, setCount] = useState(60);
  const questionsLeft = useSelector(
    (store) => store.questions.amountOfQuestions
  );
  const steps = useSelector((store) => store.questions.steps);

  const dispatch = useDispatch();

  // if (count === 0) {
  //   alert("times up!");
  //   dispatch(questions.actions.gameOver());
  // }

  const minutes = Math.floor(count / 60);
  var seconds = count % 60;
  const formatted =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>
      <TimerDiv>Time left: {formatted}</TimerDiv>
      <p>You have {questionsLeft} Q's left</p>
      <p>You have gone {steps}/20 steps</p>
    </div>
  );
};

export default Timer;
