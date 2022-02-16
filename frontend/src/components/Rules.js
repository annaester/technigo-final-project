import React from "react";
import styled from "styled-components";

const RulesBackground = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
`;

const RulesBox = styled.article`
  position: relative;
  width: 70%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: rgba(243, 236, 239, 0.9);
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #999;
  overflow: auto;
  font-size: 20px;
  color: black;

  h5 {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 12px;

    h5 {
      font-size: 12px;
    }
  }
`;

const CloseIcon = styled.span`
  content: "x";
  cursor: pointer;
  position: fixed;
  right: calc(15% - 30px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;

  @media (max-width: 700px) {
    right: calc(15%-9x);
    top: calc(100vh - 85vh - 30px);
    width: 15px;
    height: 15px;
    font-size: 15px;
    line-height: 12px;
  }
`;

const Rules = (props) => {
  return (
    <RulesBackground>
      <RulesBox>
        <CloseIcon onClick={props.handleClose}>x</CloseIcon>
        <h2>Welcome to Quiztep!</h2>
        <h3>Let's go over the basics and rules of this game.</h3>
        <ul>
          <li>
            The goal of this quiz is to reach the finish line within two
            minutes.
          </li>
          <li>The path to get to the finish line is 20 steps. </li>
          <li>
            There is 3 different types of questions: easy, medium and hard.
          </li>
          <li>
            Easy gets you one step forward, medium gets you two steps forward
            and hard gets you four steps forward.
          </li>
          <li>The max amount of questions you are allowed to answer is 24.</li>
          <li>
            If you don't reach the goal within these parameters it's game over.
            You will not lose steps if you get a question wrong. BUT every time
            you choose a question you will lose the amount of questions that the
            question is worth!
          </li>
          <li>You lose 1 question for easy, 2 for medium and 4 for hard.</li>
          <li>
            Don't worry, you will both have a timer, a progress bar and
            questions left when you take the quiz.
          </li>
        </ul>
        <h5>
          Challenge yourself! Can you get to the goal in the least amount of
          questions answered in the least amount of time?
        </h5>
      </RulesBox>
    </RulesBackground>
  );
};

export default Rules;
