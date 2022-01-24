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
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #999;
  overflow: auto;
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
`;

const Rules = (props) => {
  return (
    <RulesBackground>
      <RulesBox>
        <CloseIcon onClick={props.handleClose}>x</CloseIcon>
        <h2>Welcome to QuizTime!</h2>
        <p>
          Let's go over the basics and rules of this game. The goal of this quiz
          is to reach the goal within six minutes. The path to get to the goal
          is 20 steps. There is 3 different types of questions: Easy, medium and
          hard Easy gets you one step forward, medium gets you two steps forward
          and hard gets you 4 steps forward.The max amount of questions you are
          allowed to answer is 24. If you don't reach the goal within these you
          game over You will not lose steps if you get a question wrong BUT you
          will lose questions! You lose 1 question for easy, 2 for medium and 4
          for hard.Don't worry, you will both have a timer, a progress bar and
          questions left when you take the quiz. Challenge yourself! Can you get
          to the goal in the least amount of questions answered in the least
          amount of time?
        </p>
      </RulesBox>
    </RulesBackground>
  );
};

export default Rules;
