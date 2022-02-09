import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { questions } from "../reducers/questions";

const TimerDiv = styled.div`
  color: ${(props) => props.theme.titleColor};
  font-size: 20px;
  background: ${(props) => props.theme.infoBg};
  padding: 10px;
  border-radius: 6px;

  span {
    color: #f32163;
    font-weight: bold;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    background: rgba(249, 249, 249, 0.8);
    padding: 5px;
    border-radius: 6px;

    p {
      margin: 2px;
    }
  }
`;

const Timer = () => {
  const counter = useSelector((store) => store.questions.time);
  const [count, setCount] = useState(counter);
  const questionsLeft = useSelector(
    (store) => store.questions.amountOfQuestions
  );
  const steps = useSelector((store) => store.questions.steps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (count === 0) {
      alert("Sorry, times up!");
      dispatch(questions.actions.gameOver());
      navigate("/profile");
    }
  }, [count, dispatch, navigate]);

  useEffect(() => {
    if (steps === 20) {
      dispatch(questions.actions.setTime(formatted));
    }
  }, [steps, dispatch, formatted]);

  return (
    <div>
      <TimerDiv>
        <p>
          Time left: <span>{formatted}</span>
        </p>
        <p>
          You have <span>{questionsLeft}</span> Q's left
        </p>
        <p>
          You have gone <span>{steps}</span>/20 steps
        </p>
      </TimerDiv>
    </div>
  );
};

export default Timer;
