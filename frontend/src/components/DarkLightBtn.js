import React from "react";
import { DLToggle } from "./Themes";

const DarkLightBtn = (props) => {
  const changeTheme = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <DLToggle>
      <input type="checkbox" onClick={changeTheme} />
      <span></span>
      <p>Dark/light</p>
    </DLToggle>
  );
};

export default DarkLightBtn;
