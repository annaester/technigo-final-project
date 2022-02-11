import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import member from "../reducers/member";
import Rules from "./Rules";
import {
  Background,
  LoginBox,
  FormBox,
  InputStyle,
  Button,
  RulesInfo,
  DLToggle,
  DlBut,
} from "./Themes";

const Login = (props) => {
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
            alert("Invalid login, try again!");
          });
        }
      });

    setUsername("");
    setPassword("");
  };

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <Background>
      <DlBut>
        <DLToggle>
          <input type="checkbox" onClick={changeTheme} />
          <span></span>
          <p>Dark/Light</p>
        </DLToggle>
      </DlBut>
      <h1>Welcome to QuizTime!</h1>
      <p>
        This is a place where you will get to test your general knowledge. Log
        in to access the quiz and if you reach the finish line you might end up
        on the coveted scorboard. Read more about the game by clicking on the
        "Rules" button below.
      </p>
      <h4>Please log in to start the game.</h4>
      <LoginBox>
        <FormBox onSubmit={onFormSubmit}>
          <label htmlFor="username">Username:</label>
          <InputStyle
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="current-password">Password:</label>
          <InputStyle
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
        <Link to="/register">
          <i>Not member yet? </i>
          <b>Register here</b>
        </Link>
      </LoginBox>
      <RulesInfo>
        <p>
          <b>Wanna know what this is all about..?</b>
        </p>
        <input type="button" value="RULES" onClick={toggleRules} />
        {rules && <Rules handleClose={toggleRules} />}
      </RulesInfo>
    </Background>
  );
};

export default Login;
