import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import member from "../reducers/member";
import styled from "styled-components";

const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    rgb(215, 208, 203) 0%,
    rgb(255, 248, 243) 100%
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  font-family: "Oswald", sans-serif;
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
`;

const Button = styled.button`
  color: rgb(28, 109, 208);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgb(254, 209, 239);
  border-radius: 3px;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
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

    //flytta fetch till reducer - members
    fetch(API_URL("register"), options)
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
      <div>Welcome!</div>
      <LoginBox>
        <form onSubmit={onFormSubmit}>
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
            Register
          </Button>
        </form>
        <Link to="/">Already a member? Login here</Link>
      </LoginBox>
    </Background>
  );
};

export default Register;
