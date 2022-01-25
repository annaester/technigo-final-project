import { createSlice } from "@reduxjs/toolkit";

export const counter = createSlice({
  name: "counter",
  initialState: {
    amountOfQuestions: 24,
    quizStart: true,
    quizOver: false,
  },

  reducers: {
    reduceOneQ: (store) => {
      store.amountOfQuestions -= 1;
    },
    reduceTwoQ: (store) => {
      store.amountOfQuestions -= 2;
    },
    reduceFourQ: (store) => {
      store.amountOfQuestions -= 4;
    },
    reduceByAmount: (store, action) => {
      store.amountOfQuestions -= action.payload;
    },
  },
});
