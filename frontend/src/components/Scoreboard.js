import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../utils/constants";
import { DLToggle } from "./Themes";

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
    font-family: Oswald;
    text-align: center;
    width: 150px;
    align-self: flex-start;
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
      width: 90px;
      margin: 5px;
    }
  }
`;

const ResultsList = styled.div`
  background: ${(props) => props.theme.infoBg};
  width: 500px;
  border-radius: 6px;
  padding: 10px;

  table {
    width: 100%;
    border: none;
  }

  th {
    background: ${(props) => props.theme.formBackground};
  }

  td,
  th {
    text-align: left;
    padding: 5px;
  }

  tr:nth-child(even) {
    background: ${(props) => props.theme.formBackground};
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
    fetch(API_URL("results"))
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <ScoreBoard>
      <Link to="/profile">Go back to profile</Link>
      <DLToggle>
        <input type="checkbox" onClick={changeTheme} />
        <span></span>
        <p>Dark/light</p>
      </DLToggle>

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
                <td>{data.timeleft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResultsList>
    </ScoreBoard>
  );
};

export default Scoreboard;
