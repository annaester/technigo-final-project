import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StepperBar = styled.div`
  //align-self: flex-end;
  //margin-right: 40px;
  //position: absolute;
  transform: rotate(-90deg);
  //width: 500px;

  //margin-top: 55vh;
  //margin-right: -150px;

  progress {
    border-radius: 7px;
    height: 30px;
    width: 80vh;
  }

  progress::-webkit-progress-bar {
    background-color: ${(props) => props.theme.progressBarBg};
    border-radius: 7px;
  }

  progress::-webkit-progress-value {
    background-color: ${(props) => props.theme.progressBarValue};
    border-radius: 7px;
    box-shadow: ${(props) => props.theme.progressShadow};
  }

  @media (max-width: 900px) {
    //margin-top: 40vh;
    //margin-right: -150px;

    progress {
      border-radius: 7px;
      height: 20px;
      width: 80vh;
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const Stepper = () => {
  const steps = useSelector((store) => store.questions.steps);

  return (
    <>
      <StepperBar>
        <div>
          <label>start</label>
        </div>
        <progress value={steps} max="20" />
      </StepperBar>
    </>
  );
};

export default Stepper;
