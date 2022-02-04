import { createSlice } from "@reduxjs/toolkit";
// import { ui } from "./ui"
import { API_URL } from "../utils/constants";

const initialState = {
  questionList: [],
  amountOfQuestions: 24,
  answers: [],
  steps: 0,
  quizOver: false,
  quizStart: true,
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
      // console.log(store, action);
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

export const fetchQuestions = (level) => {
  return (dispatch) => {
    // dispatch(ui.actions.setLoading(true))

    fetch(API_URL(level))
      .then((res) => res.json())
      .then((json) => {
        const randomQ = Math.floor(Math.random() * json.length);
        dispatch(questions.actions.setQuestionList(json[randomQ]));
      });
  };
};

// reducers för:
// - start game
// - start timer
// - count questions
// - select questions
// - fetch questions -filtered om lavel
// - post answer - jämföra med rätt svar
// - gå frammåt
// - tiden är slut
// - frågorna är slut
// - man klarade det!

// goToNextQuestion: (store) => {
//   if (store.amountOfQuestions <= 0) {
//     store.quizOver = true;
//   } else {
//     store.currentQuestion += 1;
//   }
// },
