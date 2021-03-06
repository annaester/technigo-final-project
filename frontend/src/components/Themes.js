import styled from "styled-components";
import img from "../pictures/suddig_bakgrund.jpeg";
import img2 from "../pictures/startpgBgLight.jpeg";
import img3 from "../pictures/gameBgDark.jpeg";
import img4 from "../pictures/gameBgLight.jpeg";
import img5 from "../pictures/scoreBD.jpeg";
import img6 from "../pictures/scoreBL.jpeg";

export const LightTheme = {
  pageBackground: "#FAF1E6",
  titleColor: "rgba(36,29,16,1)",
  backgroundImage: `url(${img2})`,
  backgroundImageGame: `url(${img4})`,
  formBackground: "rgba(251, 108, 108, 0.8)",
  profileBackground: "rgba(81, 218, 198, 0.7)",
  dlBtnBackground: "rgba(251, 108, 108, 0.8)",
  buttonBg: "rgba(255, 255, 255, 0.8)",
  fetchButton: "rgba(248, 169, 169, 0.8)",
  answerButton: "rgba(248, 245, 169, 0.8)",
  questionBox: "rgba(243, 233, 238, 0.8)",
  scoreBoardBg: `url(${img6})`,
  progressBarBg: "rgba(255, 255, 0, 0.5)",
  progressBarValue: "rgba(0, 255, 0, 0.5)",
  progressShadow: "1px 1px 5px 3px rgba(255, 0, 255, 0.3)",
  infoBg: "rgba(255, 255, 255, 0.6)",
  buttonShadow: "2px 5px 3px rgba(0, 0, 0, 0.8)",
};

export const DarkTheme = {
  pageBackground: "#0F044C",
  titleColor: "white",
  backgroundImage: `url(${img})`,
  backgroundImageGame: `url(${img3})`,
  formBackground: "rgba(27, 27, 27, 0.8)",
  profileBackground: "rgba(113, 0, 252, 0.7)",
  dlBtnBackground: "rgba(27, 27, 27, 0.8)",
  buttonBg: "rgba(43, 194, 204, 0.8)",
  fetchButton: "rgba(164, 0, 61, 0.8)",
  answerButton: "rgba(15, 18, 154, 0.8)",
  questionBox: "rgba(160, 120, 233, 0.8)",
  scoreBoardBg: `url(${img5})`,
  progressBarBg: "rgba(255,255,255,0.6)",
  progressBarValue: "rgba(255,0,255,0.6)",
  progressShadow: "1px 1px 5px 3px rgba(0,255,0,0.3)",
  infoBg: "rgba(10, 10, 10, 0.6)",
  buttonShadow: "2px 5px 3px rgba(255, 255, 255, 0.8)",
};

export const Background = styled.div`
  background: ${(props) => props.theme.pageBackground};
  background-image: ${(props) => props.theme.backgroundImage};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  font-family: "Inter", sans-serif;

  h1, h4, p {
    color: ${(props) => props.theme.titleColor};
    width: 500px;
    text-align: center;
    }

    @media (max-width: 700px) {
      height: 100%;

      h1 {
        font-size: 20px;
        margin: 10px;
        width: 250px;
      }

      h4 {
        font-size: 14px;
        margin: 10px;
        width: 250px;
      }

      p {
        width: 250px;
      }
    }
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

  a {
    color: white;
    text-decoration: none;
    margin-top: 10px;
  }

  @media (max-width: 700px) {
    width: 250px;
    font-size: 14px;
    height: 200px;
    margin-top: 20px;
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
  margin: 5px 0;

  @media (max-width: 700px) {
    margin: 5px 0;
  }
`;

export const StartButton = styled.button`
  color: ${(props) => props.theme.titleColor};
  background: ${(props) => props.theme.buttonBg};
  font-size: 20px;
  margin: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: "Inter", sans-serif;

  :hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.buttonShadow};
    transition: 0.1s;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 5px;
    padding: 10px;
    width: auto;
  }
`;

export const Button = styled.button`
  color: ${(props) => props.theme.titleColor};
  background: ${(props) => props.theme.buttonBg};
  font-size: 1em;
  margin: 15px 15px 5px 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: "Inter", sans-serif;

  :hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.buttonShadow};
    transition: 0.1s;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 15px 5px 5px 5px;
    padding: 4px;
    width: 70px;
  }
`;

export const RulesInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: white;
  }

  input {
    color: black;
    font-size: 1em;
    margin: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-family: "Inter", sans-serif;

    :hover {
      cursor: pointer;
      background-color: rgba(43, 194, 204, 0.9);
      color: white;
    }
    @media (max-width: 700px) {
      font-size: 14px;
      padding: 7px;
    }
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

export const DLToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  color: ${(props) => props.theme.titleColor};
  align-self: flex-start;
  margin: 15px 20px;
  font-family: "Inter", sans-serif;


  @media (max-width: 700px) {
    width: 40px;
    height: 20px;
    margin: 10px 5px 5px 5px;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:rgba(43, 194, 204);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;

    @media (max-width: 700px) {
      width: 16px;
      height: 16px;
      left: 2px;
      bottom: 2px;
    }
  }

  input:checked + span {
    background-color: #f32163;
  }

  input:focus + span {
    box-shadow: 0 0 1px #f32163;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);

    @media (max-width: 700px) {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  }

  p {
    text-align: center;
    margin: 7px 15px 0 -10px;
    padding-top: 10px;
    padding-right: 20px;
    width: 100px;

    @media (max-width: 700px) {
      font-size: 12px;
      text-align: center;
      margin: 7px 15px 0 -25px;
      padding-top: 2px;
      padding-right: 0;
      width: 80px;
    }
  }
  }
`;

export const DlBut = styled.div`
  align-self: flex-end;
  width: 100px;
  margin-right: 20px;
  text-align: center;

  @media (max-width: 700px) {
  }
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 50px;
  width: 100vw;

  @media (max-width: 700px) {
    width: 90vw;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

export const GP = styled.main`
  background-image: ${(props) => props.theme.backgroundImageGame};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
`;

export const AnswerBtn = styled.button`
  background: ${(props) => props.theme.answerButton};
  color: ${(props) => props.theme.titleColor};
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: "Inter", sans-serif;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 5px;
  }
`;

export const FetchBtn = styled.button`
  background: ${(props) => props.theme.fetchButton};
  color: ${(props) => props.theme.titleColor};
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: "Inter", sans-serif;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 5px;
  }
`;

export const QuestionB = styled.p`
  background: ${(props) => props.theme.questionBox};
  color: ${(props) => props.theme.titleColor};
  padding: 30px;
  border-radius: 5px;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 5px;
  }
`;
