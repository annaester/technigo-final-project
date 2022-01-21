import React, { useState, useEffect } from "react";

const Timer = () => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>
      <div>Countdown: {count}</div>
    </div>
  );
};

export default Timer;
