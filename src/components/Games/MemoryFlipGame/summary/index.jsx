import React from "react";
import { Redirect, withRouter } from "react-router-dom";

function formatTime(s) {
  let min = ((s / 60) | 0).toString().padStart(2, "0");
  let sec = (s % 60).toString().padStart(2, "0");
  return min + ":" + sec;
}

function Summary({ gameStats,score,currentScore,timeTaken }) {
  if (!gameStats.matched) {
    return <Redirect to="/lobby" />;
  }

  return (
    <h2 className="ui icon header">
      <i className="thumbs up outline icon"></i>
      <div className="content">
        Finished!
        <div className="sub header">
          You matched all {gameStats.matched.length} cards,
          <br />
          Good memory!
          <br/>
         Your Current Score {currentScore} 
          <br/> 
          {score? <span>{`Your Total score: ${Math.round(score)}`}</span>:""}
          <br/> 
          {timeTaken && <span>Time Taken: {formatTime(timeTaken)}</span>}
        </div>
      </div>
    </h2>
  );
}

export default withRouter(Summary);
