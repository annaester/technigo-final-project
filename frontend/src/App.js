import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Game from "./components/Game";
import Profile from "./components/Profile";
import Scoreboard from "./components/Scoreboard";

import member from "./reducers/member";
import { questions } from "./reducers/questions";

const reducer = combineReducers({
  member: member.reducer,
  questions: questions.reducer,
});

const store = configureStore({ reducer });

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game" element={<Game />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
