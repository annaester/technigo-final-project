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
    width: 70%;
    align-self: center;

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
    top: calc(100vh - 85vh - 30px);
    right: calc(15%-9px);
    width: 15px;
    height: 15px;
    font-size: 15px;
    line-height: 11px;
  }
`;

const PopUp = (props) => {
  return (
    <RulesBackground>
      <RulesBox>
        <CloseIcon onClick={props.handleClose}>x</CloseIcon>
        <h5>{props.text}</h5>
      </RulesBox>
    </RulesBackground>
  );
};

export default PopUp;
