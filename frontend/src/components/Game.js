import React, { useEffect } from "react";
// import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import member from "../reducers/member";
import { fetchEasyQuestions } from "../reducers/questions";
import { fetchMiddleQuestions } from "../reducers/questions";
import { fetchHardQuestions } from "../reducers/questions";

const Game = () => {
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

  return (
    <>
      <button onClick={logout}>Sign out!</button>
      <div>Welcome to secret gamepage</div>
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
      <h2>Questions</h2>
      {/* <div key={q._id}> */}
      <div>
        <p>{questions.question}</p>
        <button>{questions.answerone}</button>
        <button>{questions.answertwo}</button>
        <button>{questions.answerthree}</button>
        <button>{questions.answerfour}</button>
      </div>

      {/* {questions
        // .filter((q) => q.level === 1)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))} */}

      {/* <h2>Kind of easy questions</h2>

      {questions
        // .filter((q) => q.level === 2)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))} */}

      {/* <h2>Hard questions</h2>

      {questions
        // .filter((q) => q.level === 4)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))} */}
    </>
  );
};

export default Game;
