import styled from "styled-components";
import img from "../pictures/suddig_bakgrund.jpeg";
import img2 from "../pictures/startpgBgLight.jpeg";
import img3 from "../pictures/gameBgDark.jpeg";
import img4 from "../pictures/gameBgLight.jpeg";
import img5 from "../pictures/scoreBD.jpeg";
import img6 from "../pictures/scoreBL.jpeg";

export const LightTheme = {
  pageBackground: "#FAF1E6",
  titleColor: "black",
  backgroundImage: `url(${img2})`,
  backgroundImageGame: `url(${img4})`,
  formBackground: "rgba(251, 108, 108, 0.8)",
  dlBtnBackground: "rgba(251, 108, 108, 0.8)",
  buttonBg: "rgba(43, 194, 204, 0.8)",
  fetchButton: "rgba(248, 169, 169, 0.8)",
  answerButton: "rgba(248, 245, 169, 0.8)",
  questionBox: "rgba(243, 233, 238, 0.8)",
  scoreBoardBg: `url(${img6})`,
};

export const DarkTheme = {
  pageBackground: "#0F044C",
  titleColor: "white",
  backgroundImage: `url(${img})`,
  backgroundImageGame: `url(${img3})`,
  formBackground: "rgba(27, 27, 27, 0.8)",
  dlBtnBackground: "rgba(27, 27, 27, 0.8)",
  buttonBg: "rgba(43, 194, 204, 0.8)",
  fetchButton: "rgba(164, 0, 61, 0.8)",
  answerButton: "rgba(15, 18, 154, 0.8)",
  questionBox: "rgba(160, 120, 233, 0.8)",
  scoreBoardBg: `url(${img5})`,
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

  :hover {
    cursor: pointer;
  }
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

    :hover {
      cursor: pointer;
    }
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

  :hover {
    cursor: pointer;
  }
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

  :hover {
    cursor: pointer;
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
  font-family: Oswald;

  :hover {
    cursor: pointer;
  }
`;

export const QuestionB = styled.p`
  background: ${(props) => props.theme.questionBox};
  color: ${(props) => props.theme.titleColor};
  padding: 30px;
  border-radius: 5px;
  text-align: center;
`;
