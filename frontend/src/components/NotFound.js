import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bgimg from "../pictures/notfound.jpg";

const NotfoundBox = styled.main`
  background-image: url(${bgimg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: "Inter", sans-serif;

  div {
    justify-content: center;
    align-content: center;
  }
`;

const GoBack = styled.div`
  justify-self: flex-start;
  align-self: flex-start;
  position: absolute;
  font-family: "Inter", sans-serif;
  margin: 10px;
  a {
    text-decoration: none;
    color: black;

    :hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
`;

const NotFound = () => {
  return (
    <>
      <GoBack>
        <Link to="/">Bo back</Link>
      </GoBack>
      <NotfoundBox>
        <div>
          <h1>Wrong route..</h1>
        </div>
      </NotfoundBox>
    </>
  );
};

export default NotFound;
