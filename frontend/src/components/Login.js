import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import member from "../reducers/member";
import styled from "styled-components";
import img from "../pictures/suddig_bakgrund.jpeg";

import Rules from "./Rules";

const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    rgb(215, 208, 203) 0%,
    rgb(255, 248, 243) 100%
  );
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* filter: blur(1px); */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  font-family: "Oswald", sans-serif;

  h1 {
    color: white;
  }
}
`;

const LoginBox = styled.div`
  margin-top: 50px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 5px;
  height: 300px;
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  background: rgb(163, 228, 219);
  box-shadow: 2px 2px 15px #6e6e6e;
  /* filter: blur(0); */
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  color: rgb(28, 109, 208);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgb(254, 209, 239);
  border-radius: 3px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rules, setRules] = useState(false);

  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleRules = () => {
    setRules(!rules);
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    //flytta denna fetch till reducer - members
    fetch(API_URL("login"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setUserId(data.response.userId));
            dispatch(member.actions.setUsername(data.response.username));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(member.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setUserId(null));
            dispatch(member.actions.setUsername(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setError(data.response));
          });
        }
      });
  };
  return (
    <Background>
      <h1>Hello Again!</h1>
      <input type="button" value="RULES" onClick={toggleRules} />
      {rules && <Rules handleClose={toggleRules} />}
      <LoginBox>
        <FormBox onSubmit={onFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="current-password">Password:</label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={onFormSubmit}>
            Login
          </Button>
        </FormBox>
        <Link to="/register">Not member yet? Register here</Link>
        {/* <Timer /> */}
      </LoginBox>
    </Background>
  );
};

export default Login;
