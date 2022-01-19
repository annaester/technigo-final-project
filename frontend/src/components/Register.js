import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import member from "../reducers/member";

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
    <>
      <div>Hello from login</div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={onFormSubmit}>
          Register
        </button>
      </form>
      <Link to="/">Already a member? Login here</Link>
    </>
  );
};

export default Register;
