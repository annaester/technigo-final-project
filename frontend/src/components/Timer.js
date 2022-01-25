import React, { useState, useEffect } from "react";

const Timer = () => {
  const [count, setCount] = useState(360);

  const minutes = Math.floor(count / 60);
  var seconds = count % 60;
  const formatted =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>
      <div>Time left: {formatted}</div>
    </div>
  );
};

export default Timer;
