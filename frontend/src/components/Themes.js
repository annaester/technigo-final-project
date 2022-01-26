import React from "react";
import styled from "styled-components";
import img from "../pictures/suddig_bakgrund.jpeg";

export const Background = styled.div`
  background: ${(props) => props.theme.pageBackground};
  background-image: ${(props) => props.theme.backgroundImage};
  /* url(${img}); */
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

  h1, h4 {
    color: ${(props) => props.theme.titleColor};
  }
}
`;

export const LoginBox = styled.div`
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
  background: ${(props) => props.theme.formBackground};
  box-shadow: 2px 2px 15px #6e6e6e;
  /* filter: blur(0); */

  a {
    color: white;
    text-decoration: none;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputStyle = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 5px;
`;

export const Button = styled.button`
  color: ${(props) => props.theme.titleColor};
  background: ${(props) => props.theme.buttonBg};
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Oswald;
`;

export const RulesInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${(props) => props.theme.titleColor};
  }

  input {
    color: black;
    font-size: 1em;
    margin: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: Oswald;
  }
`;

export const DLBtn = styled.button`
  color: ${(props) => props.theme.titleColor};
  background: ${(props) => props.theme.dlBtnBackground};
  font-size: 1em;
  width: 100px;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Oswald;
`;

export const GP = styled.main`
  background-image: ${(props) => props.theme.backgroundImageGame};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
`;

export const AnswerBtn = styled.button`
  background: ${(props) => props.theme.answerButton};
  color: ${(props) => props.theme.titleColor};
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Oswald;
`;

export const FetchBtn = styled.button`
  background: ${(props) => props.theme.fetchButton};
  color: ${(props) => props.theme.titleColor};
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Oswald;
`;
export const QuestionB = styled.p`
  background: ${(props) => props.theme.questionBox};
  color: ${(props) => props.theme.titleColor};
  padding: 30px;
  border-radius: 5px;
  text-align: center;
`;
