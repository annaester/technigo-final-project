import { createSlice } from "@reduxjs/toolkit";
// import { ui } from "./ui"
import { API_URL } from "../utils/constants";

const initialState = {
  questionList: [],
  amountOfQuestions: 24,
  currentQuestion: 0,
  answers: [],
  steps: 0,
  quizOver: false,
  quizStart: true,
};

export const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionList: (store, action) => {
      // console.log(store, action);
      store.questionList = action.payload;
    },
    setAmountOfQuestions: (store, action) => {
      const que = questions.questionList.level;
      const queL = questions.amountOfQuestions;
      if (que === 1) {
        return queL - 1;
      } else if (que === 2) {
        return queL - 2;
      } else if (que === 4) {
        return queL - 4;
      }
      //decresefunction1 amountOfQuestions -1
      //decresefunction2 amountOfQuestions -2
      //decresefunction4 amountOfQuestions -4
      store.amountOfQuestions = action.payload;
    },
    setSteps: (store, action) => {
      // const { answerIndex } = action.payload;
      // const level = store.questionList.level;
      // const makeNum = store.questionList.correctanswer;
      // let step = store.questions.steps;
      // if (answerIndex === makeNum && level === 1) {
      //   step = action.setSteps + 1;
      // }
      // if (answerIndex === makeNum && level === 2) {
      //   step = action.setStep + 2;
      // }
      // if (answerIndex === makeNum && level === 4) {
      //   step = action.setStep + 4;
      // }
    },
    submitAnswer: (store, action) => {
      const { questionId, answerIndex } = action.payload;
      // console.log(questionId, answerIndex);
      // console.log("string?", store.questionList.correctanswer);
      // const question = store(answerIndex === questionId)

      // const level = store.questionList.level;
      const makeNum = store.questionList.correctanswer;

      if (answerIndex === +makeNum) {
        // if (level === 1) {
        //   setStep(+1);
        // } else if (level === 2) {
        //   setSteps(+2);
        // } else if (level === 4) {
        //   setSteps(+4);
        // }

        // om rätt - steps increase by 1/2/4 beroende på level=1 increase +1/ level=2 increase +2
        // dispatch(questions.setSteps)
        console.log("correctanswer!");
      } else {
        //stay put
        console.log("wrong!");
      }

      store.answers.push({
        questionId,
        answerIndex,
      });
    },
    goToNextQuestion: (store) => {
      if (store.amountOfQuestions <= 0) {
        store.quizOver = true;
      } else {
        store.currentQuestion += 1;
      }
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
        // dispatch(questions.actions.setAmountOfQuestions(-+level));
      });
  };
};

// export const fetchEasyQuestions = () => {
//   return (dispatch) => {
//     // dispatch(ui.actions.setLoading(true))

//     fetch(API_URL("questions?level=1"))
//       .then((res) => res.json())
//       .then((json) => {
//         const randomQ = Math.floor(Math.random() * json.length);
//         dispatch(questions.actions.setQuestionList(json[randomQ]));

//         dispatch(questions.actions.setAmountOfQuestions());
//         // dispatch(ui.action.setLoading())
//       });
//   };
// };

// export const fetchMiddleQuestions = () => {
//   return (dispatch) => {
//     // dispatch(ui.actions.setLoading(true))

//     fetch(API_URL("questions?level=2"))
//       .then((res) => res.json())
//       .then((json) => {
//         const randomQ = Math.floor(Math.random() * json.length);
//         dispatch(questions.actions.setQuestionList(json[randomQ]));
//       });
//   };
// };

// export const fetchHardQuestions = () => {
//   return (dispatch) => {
//     // dispatch(ui.actions.setLoading(true))

//     fetch(API_URL("questions?level=4"))
//       .then((res) => res.json())
//       .then((json) => {
//         const randomQ = Math.floor(Math.random() * json.length);
//         dispatch(questions.actions.setQuestionList(json[randomQ]));
//       });
//   };
// };

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
// }
//   },
// });
