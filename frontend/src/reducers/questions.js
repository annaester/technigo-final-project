import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

const initialState = {
  questionList: [],
  amountOfQuestions: 24,
  answers: [],
  steps: 0,
  time: 120,
  timeSpent: "0",
  start: 0,
  finish: 0,
};

export const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionList: (store, action) => {
      store.questionList = action.payload;
    },
    setAmountOfQuestions1: (store) => {
      store.amountOfQuestions -= 1;
    },
    setAmountOfQuestions2: (store) => {
      store.amountOfQuestions -= 2;
    },
    setAmountOfQuestions4: (store) => {
      store.amountOfQuestions -= 4;
    },
    setTime: (store, action) => {
      const formatted = action.payload;
      store.timeSpent = formatted;
    },
    setStart: (store, action) => {
      store.start = action.payload;
    },
    setFinish: (store, action) => {
      store.finish = action.payload;
    },
    submitAnswer: (store, action) => {
      const { questionId, answerIndex } = action.payload;

      const correctanswer = store.questionList.correctanswer;
      const level = store.questionList.level;

      if (answerIndex === correctanswer && level === 1) {
        store.steps += 1;
      } else if (answerIndex === correctanswer && level === 2) {
        store.steps += 2;
      } else if (answerIndex === correctanswer && level === 4) {
        store.steps += 4;
      }

      store.answers.push({
        questionId,
        answerIndex,
      });
    },

    gameOver: () => {
      return initialState;
    },
  },
});

export const fetchQuestions = (level, accessToken) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  };

  return (dispatch) => {
    fetch(API_URL(level), options)
      .then((res) => res.json())
      .then((json) => {
        var i = 0;
        var j = 0;
        var temp = null;

        for (i = json.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = json[i];
          json[i] = json[j];
          json[j] = temp;
        }
        dispatch(questions.actions.setQuestionList(json[j]));
      });
  };
};
