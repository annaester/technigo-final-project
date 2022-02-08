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
import Goal from "./components/Goal";
import { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme } from "./components/Themes";

import member from "./reducers/member";
import { questions } from "./reducers/questions";

const reducer = combineReducers({
  member: member.reducer,
  questions: questions.reducer,
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
              <Route
                path="/goal"
                element={<Goal theme={theme} setTheme={setTheme} />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
