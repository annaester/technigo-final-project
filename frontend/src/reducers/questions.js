import { createSlice } from "@reduxjs/toolkit";
// import { ui } from "./ui"
import { API_URL } from "../utils/constants";

export const questions = createSlice({
  name: "questions",
  initialState: {
    questionList: [],
    error: null,
  },
  reducers: {
    setQuestionList: (store, action) => {
      store.questionList = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },

    // reducers för:
    // - start game
    // - start timer
    // - count questions
    // - select questions
    // - festch questions -filtered om lavel
    // - post answer - jämföra med rätt svar
    // - gå frammåt
    // - tiden är slut
    // - frågorna är slut
    // - man klarade det!
  },
});

export const fetchEasyQuestions = () => {
  return (dispatch) => {
    // dispatch(ui.actions.setLoading(true))

    fetch(API_URL("questions?level=1"))
      .then((res) => res.json())
      .then((json) => {
        const randomQ = Math.floor(Math.random() * json.length);
        dispatch(questions.actions.setQuestionList(json[randomQ]));
        // dispatch(ui.action.setLoading())
      });
  };
};

export const fetchMiddleQuestions = () => {
  return (dispatch) => {
    // dispatch(ui.actions.setLoading(true))

    fetch(API_URL("questions?level=2"))
      .then((res) => res.json())
      .then((json) => {
        const randomQ = Math.floor(Math.random() * json.length);
        dispatch(questions.actions.setQuestionList(json[randomQ]));
        // dispatch(ui.action.setLoading())
      });
  };
};

export const fetchHardQuestions = () => {
  return (dispatch) => {
    // dispatch(ui.actions.setLoading(true))

    fetch(API_URL("questions?level=4"))
      .then((res) => res.json())
      .then((json) => {
        const randomQ = Math.floor(Math.random() * json.length);
        dispatch(questions.actions.setQuestionList(json[randomQ]));
        // dispatch(ui.action.setLoading())
      });
  };
};
