import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../utils/constants";
import { DLToggle, HeaderBox } from "./Themes";

const ScoreBoard = styled.main`
  background-image: ${(props) => props.theme.scoreBoardBg};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.titleColor};

  a {
    color: ${(props) => props.theme.titleColor};
    text-decoration: none;
    background: ${(props) => props.theme.buttonBg};
    font-size: 1em;
    margin: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: "Inter", sans-serif;
    text-align: center;
    width: 150px;
    //align-self: flex-start;

    :hover {
      cursor: pointer;
      box-shadow: ${(props) => props.theme.buttonShadow};
      transition: 0.1s;
    }
  }

  h1 {
    text-align: center;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 20px;
    }

    a {
      padding: 5px;
      font-size: 12px;
      width: 80px;
      margin-left: 20px;
    }
  }
`;

const ResultsList = styled.div`
  background: ${(props) => props.theme.buttonBg};
  width: 550px;
  border-radius: 6px;
  padding: 10px;
  font-family: "Inter", sans-serif;
  font-size: 20px;

  table {
    width: 100%;
    border: none;
  }

  th {
    background: ${(props) => props.theme.infoBg};
  }

  td,
  th {
    text-align: left;
    padding: 5px;
  }

  tr:nth-child(even) {
    //background: rgba(27, 27, 27, 0.2);
    background: ${(props) => props.theme.infoBg};
    margin: 0;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    width: 80vw;
  }
`;

const Scoreboard = (props) => {
  const [results, setResults] = useState([]);
  const accessToken = useSelector((store) => store.member.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("results"), options)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [accessToken]);

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <ScoreBoard>
      <HeaderBox>
        <Link to="/profile">Go back to profile</Link>
        <DLToggle>
          <input type="checkbox" onClick={changeTheme} />
          <span></span>
          <p>Dark/light</p>
        </DLToggle>
      </HeaderBox>

      <ResultsList>
        <h1>Scoreboard</h1>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Questions used</th>
              <th>Finished in</th>
            </tr>
          </thead>
          <tbody>
            {results.map((data) => (
              <tr key={data._id}>
                <td>{data.username}</td>
                <td> {data.answers}</td>
                <td>{data.timespent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResultsList>
    </ScoreBoard>
  );
};

export default Scoreboard;
