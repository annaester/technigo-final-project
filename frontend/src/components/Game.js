import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import member from "../reducers/member";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";

const Game = () => {
  const [amountOfQuestions, setAmountOfQuestions] = useState(24);
  const accessToken = useSelector((store) => store.member.accessToken);
  const questions = useSelector((store) => store.questions.questionList);

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
      <div>Welcome to secret gamepage</div>
      <h3>You have {amountOfQuestions} left</h3>
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
      <h2>Questions</h2>
      <div>
        <p>{questions.question}</p>
        {questions?.options?.map((answer) => (
          <button key={answer}>{answer}</button>
        ))}
      </div>
    </>
  );
};

export default Game;
