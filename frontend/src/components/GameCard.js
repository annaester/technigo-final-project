import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";
import styled from "styled-components";

const GameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const GameCard = () => {
  const questions = useSelector((store) => store.questions.questionList);

  const dispatch = useDispatch();

  const onAnswerSubmit = (_id, index) => {
    dispatch(
      questions.actions.submitAnswer({
        questionId: _id,
        answerIndex: index,
      })
    );

  return (
    <GameBox>
      <button
        onClick={() => {
          dispatch(fetchEasyQuestions());
        }}
      >
        Easy Questions
      </button>
      <button
        onClick={() => {
          dispatch(fetchMiddleQuestions());
        }}
      >
        Middle Questions
      </button>
      <button
        onClick={() => {
          dispatch(fetchHardQuestions());
        }}
      >
        Hard Questions
      </button>
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
    </GameBox>
  );
}

export default GameCard
