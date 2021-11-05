import "./MemoryFlip.css";
import "semantic-ui-css/semantic.css";
import React, { useState, useEffect } from "react";
import Board from "./board";
import Summary from "./summary";
import { withRouter } from "react-router-dom";
import ScoreBoard from "./board/ScoreBoard";
import { useDispatch } from "react-redux";
import { removeHint } from "../../../redux/actions/hintActions";

MemoryFlip.defaultProps = {
  gridSize: [5, 2],
};

function MemoryFlip({ gridSize, products,seconds,setSeconds }) {
  // const GRID_SIZES = [
  //   [3, 4],
  //   [5, 2],
  //   [4, 4],
  //   [4, 5],
  // ];

  const GAME_VIEWS = {
    LOBBY: "lobby",
    PLAYING: "playing",
    SUMMARY: "summary",
  };

  const [viewOption, setViewOption] = useState(GAME_VIEWS.PLAYING);
  const dispatch = useDispatch();
  // const [gridSize, setGridSize] = useState(GRID_SIZES[1]);

  //console.log("here : ",viewOption);

  const [gameStats, setGameStats] = useState({
    matched: null,
    matchedAll: null,
    moves: 0,
  });

  useEffect(() => {
    //console.log(gameStats);
    if(viewOption === GAME_VIEWS.SUMMARY){
      console.log("Game Completed : ",gameStats.moves);
      console.log("Time Taken : ",seconds);

      localStorage.removeItem('hint')
      localStorage.removeItem('time')
      //Gugad
      setSeconds(0);
      setTimeout(() => {
        dispatch(removeHint());
      }, 10000);
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
          GAME_VIEWS={GAME_VIEWS}
          setViewOption={setViewOption}
          gameStats={gameStats}
        />
      )}

      {/* <Route
        exact
        path="/memory/"
        render={() => {
          setViewOption(GAME_VIEWS.LOBBY);
          return renderGame(GAME_VIEWS.LOBBY);
        }}
      />
      <Route
        path="/memory/lobby"
        render={() => {
          setViewOption(GAME_VIEWS.LOBBY);
          return renderGame(GAME_VIEWS.LOBBY);
        }}
      />
      <Route
        path="/memory/playing"
        render={() => {
          setViewOption(GAME_VIEWS.PLAYING);
          return renderGame(GAME_VIEWS.PLAYING);
        }}
      /> */}
      {/* <Route path="/memory/summary" render={() => renderGame(GAME_VIEWS.SUMMARY)} /> */}
    </div>
  );
}

export default withRouter(MemoryFlip);
