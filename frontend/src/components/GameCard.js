import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";

const GameCard = () => {
  const [amountOfQuestions, setAmountOfQuestions] = useState(24);
  const questions = useSelector((store) => store.questions.questionList);

  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(fetchEasyQuestions());
          setAmountOfQuestions(amountOfQuestions - 1);
        }}
      >
        Easy Questions
      </button>
      <button
        onClick={() => {
          dispatch(fetchMiddleQuestions());
          setAmountOfQuestions(amountOfQuestions - 2);
        }}
      >
        Middle Questions
      </button>
      <button
        onClick={() => {
          dispatch(fetchHardQuestions());
          setAmountOfQuestions(amountOfQuestions - 4);
        }}
      >
        Hard Questions
      </button>
      <div>
        <p>{questions.question}</p>
        {questions?.options?.map((answer) => (
          <button key={answer}>{answer}</button>
        ))}
      </div>
    </div>
  );
};

export default GameCard;
