import React, { useState } from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Game from "./components/Game";
import Profile from "./components/Profile";
import Scoreboard from "./components/Scoreboard";
import { ThemeProvider } from "styled-components";
import img from "../src/pictures/suddig_bakgrund.jpeg";
import img2 from "../src/pictures/startpgBgLight.jpeg";
import img3 from "../src/pictures/gameBgDark.jpeg";
import img4 from "../src/pictures/gameBgLight.jpeg";
import img5 from "../src/pictures/scoreBD.jpeg";
import img6 from "../src/pictures/scoreBL.jpeg";

import member from "./reducers/member";
import { questions } from "./reducers/questions";

const reducer = combineReducers({
  member: member.reducer,
  questions: questions.reducer,
  // quizreducer: quizreducer.reducer,
});

const persistedStateJSON = localStorage.getItem("myAppReduxState");
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  localStorage.setItem("myAppReduxState", JSON.stringify(store.getState()));
});

const LightTheme = {
  pageBackground: "#FAF1E6",
  titleColor: "black",
  backgroundImage: `url(${img2})`,
  backgroundImageGame: `url(${img4})`,
  formBackground: "rgba(251, 108, 108, 0.8)",
  dlBtnBackground: "rgba(251, 108, 108, 0.8)",
  buttonBg: "rgba(43, 194, 204, 0.8)",
  fetchButton: "rgba(248, 169, 169, 0.8)",
  answerButton: "rgba(248, 245, 169, 0.8)",
  questionBox: "rgba(243, 233, 238, 0.8)",
  scoreBoardBg: `url(${img6})`,
};

const DarkTheme = {
  pageBackground: "#0F044C",
  titleColor: "white",
  backgroundImage: `url(${img})`,
  backgroundImageGame: `url(${img3})`,
  formBackground: "rgba(27, 27, 27, 0.8)",
  dlBtnBackground: "rgba(27, 27, 27, 0.8)",
  buttonBg: "rgba(43, 194, 204, 0.8)",
  fetchButton: "rgba(164, 0, 61, 0.8)",
  answerButton: "rgba(15, 18, 154, 0.8)",
  questionBox: "rgba(160, 120, 233, 0.8)",
  scoreBoardBg: `url(${img5})`,
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <>
      <ThemeProvider theme={themes[theme]}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Login theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/register"
                element={<Register theme={theme} setTheme={setTheme} />}
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/profile"
                element={<Profile theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/game"
                element={<Game theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/scoreboard"
                element={<Scoreboard theme={theme} setTheme={setTheme} />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
