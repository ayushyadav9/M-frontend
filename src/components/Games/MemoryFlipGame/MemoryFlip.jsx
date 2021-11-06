import "./MemoryFlip.css";
import "semantic-ui-css/semantic.css";
import React, { useState, useEffect } from "react";
import Board from "./board";
import Summary from "./summary";
import { withRouter } from "react-router-dom";
import ScoreBoard from "./board/ScoreBoard";

MemoryFlip.defaultProps = {
  gridSize: [5, 2],
};

function MemoryFlip({ gridSize, products,seconds,setSeconds,setgameOver }) {
  const [score, setscore] = useState(null)
  const [timeTaken, settimeTaken] = useState(null)
  const [currentScore, setcurrentScore] = useState(0)

  const GAME_VIEWS = {
    LOBBY: "lobby",
    PLAYING: "playing",
    SUMMARY: "summary",
  };

  const [viewOption, setViewOption] = useState(GAME_VIEWS.PLAYING);
  const [gameStats, setGameStats] = useState({
    matched: null,
    matchedAll: null,
    moves: 0,
  });

  useEffect(() => {
    if(gameStats.moves!==0 && seconds!==0){
      setcurrentScore(Math.round(100/(0.05*seconds) + (0.005*gameStats.moves)))
    }
  }, [gameStats.moves,seconds])

  useEffect(() => {
    if(viewOption === GAME_VIEWS.SUMMARY){
      setgameOver(true);
      settimeTaken(seconds)
      console.log("Game Completed : ",gameStats.moves);
      console.log("Time Taken : ",seconds);
      fetch("https://myntrah-backend.herokuapp.com/sendScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({gametype :"memory-flip",moves: gameStats.moves,time: seconds})
        })
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result)
              if (result.success) {
                setscore(result.data.score)
              } else {
                console.log(result.message)
              }
            },
            (error) => {
              console.log(error)
            }
          );
          setSeconds(0)
      localStorage.removeItem('hint')
      localStorage.removeItem('time')
    }
    // eslint-disable-next-line
  }, [viewOption]);

  return (
    <div className="App">
      <div className="ui huge borderless stackable menu">
        <span className="ui header">Memory Game</span>
      </div>
      {viewOption === GAME_VIEWS.PLAYING && (
        <div>
          <Board
            grid={gridSize}
            GAME_VIEWS={GAME_VIEWS}
            setViewOption={setViewOption}
            gameStats={gameStats}
            setGameStats={setGameStats}
            products={products}
          />
          <ScoreBoard moves={gameStats.moves} />
        </div>
      )}

      {viewOption === GAME_VIEWS.SUMMARY && (        
        <Summary
          score={score}
          timeTaken={timeTaken}
          currentScore={currentScore}
          GAME_VIEWS={GAME_VIEWS}
          setViewOption={setViewOption}
          gameStats={gameStats}
        />
      )}
    </div>
  );
}

export default withRouter(MemoryFlip);
