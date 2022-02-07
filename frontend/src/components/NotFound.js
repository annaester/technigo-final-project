import React from "react";
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
`;

const NotFound = () => {
  return (
    <NotfoundBox>
      <h1>Wrong route..</h1>
    </NotfoundBox>
  );
};

export default NotFound;
