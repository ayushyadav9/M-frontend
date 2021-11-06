import React from "react";
import { useEffect } from "react";

function formatTime(s) {
  let min = ((s / 60) | 0).toString().padStart(2, "0");
  let sec = (s % 60).toString().padStart(2, "0");
  return min + ":" + sec;
}

const DTimer = ({seconds, setSeconds}) => {
 
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev < 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      { seconds === 0 ? (<h1>Time Up !</h1>) : (
        <h1>
          {" "}
          {formatTime(seconds)}
        </h1>
      )}
    </div>
  );
};

DTimer.defaultProps = {
    seconds: 60
};

export default DTimer;
