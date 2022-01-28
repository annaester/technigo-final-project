import React, { useState } from "react";
import { DLBtn } from "./Themes";

const ChangeTheme = () => {
  const [theme, setTheme] = useState("dark");

  const change = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return <DLBtn onClick={change}>Dark/light</DLBtn>;
};

export default ChangeTheme;
