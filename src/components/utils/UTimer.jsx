import React from "react";
import { useEffect } from "react";

function formatTime(s) {
  let min = ((s / 60) | 0).toString().padStart(2, "0");
  let sec = (s % 60).toString().padStart(2, "0");
  return min + ":" + sec;
}

const Timer = ({seconds, setSeconds}) => {

  useEffect(() => {
    let myInterval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {seconds === 0 ? null : (
        <h1>
          {" "}
          {formatTime(seconds)}
        </h1>
      )}
    </div>
  );
};

export default Timer;
