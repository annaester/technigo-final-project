import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import member from "../reducers/member";

const Game = () => {
  const [questions, setQuestions] = useState([]);

  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    fetch(API_URL("questions"))
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const logout = () => {
    dispatch(member.actions.setAccessToken(""));
  };

  return (
    <>
      <button onClick={logout}>Sign out!</button>
      <div>Welcome to secret gamepage</div>
      <h2>Easy questions</h2>

      {questions
        .filter((q) => q.level === 1)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))}
      <h2>Kind of easy questions</h2>

      {questions
        .filter((q) => q.level === 2)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))}
      <h2>Hard questions</h2>

      {questions
        .filter((q) => q.level === 4)
        .map((q) => (
          <div key={q._id}>
            <p>{q.question}</p>
            <button>{q.answerone}</button>
            <button>{q.answertwo}</button>
            <button>{q.answerthree}</button>
            <button>{q.answerfour}</button>
          </div>
        ))}
    </>
  );
};

export default Game;
