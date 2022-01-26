import { createSlice } from "@reduxjs/toolkit";
// import { ui } from "./ui"
import { API_URL } from "../utils/constants";

export const questions = createSlice({
  name: "questions",
  initialState: {
    questionList: [],
    amountOfQuestions: 24,
    // currentQuestionIndex: 0,
    error: null,
    quizStart: true,
    quizOver: false,
    answers: [],
  },
  reducers: {
    //functions on how to update the store
    setQuestionList: (store, action) => {
      store.questionList = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setAmountOfQuestions: (store, action) => {
      store.amountOfQuestions = action.payload;
    },

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
  },

  submitAnswer: (store, action) => {
    console.log(store, action);
    const { questionId, answerIndex } = action.payload;
    const question = store.questionList.find((q) => q._id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    store.answers.push({
      questionId,
      answerIndex,
      question,
      answer: question.options[answerIndex],
      isCorrect: question.correctanswer === answerIndex,
    });
  },

  start: (store) => {
    store.quizStart = false;
  },
  gameOver: (store) => {
    store.quizOver = true;
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

        // dispatch(questions.actions.setAmountOfQuestions());
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

// export const quiz = createSlice({
//   name: "quiz",
//   reducers: {
//     start: (store) => {
//       store.quizStart = false;
//     },

//     gameOver: (store) => {
//       store.quizOver = true;
//     },

// submitAnswer: (store, action) => {
//   const { questionId, answerIndex } = action.payload;
//   const question = store.questionList.find((q) => q._id === questionId);

//   if (!question) {
//     throw new Error(
//       "Could not find question! Check to make sure you are passing the question id correctly."
//     );
//   }

//   if (question.options[answerIndex] === undefined) {
//     throw new Error(
//       `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
//     );
//   }

//   store.answer.push({
//     questionId,
//     answerIndex,
//     question,
//     answer: question.options[answerIndex],
//     isCorrect: question.correctanswer === answerIndex,
//   });
// },
//   },
// });
