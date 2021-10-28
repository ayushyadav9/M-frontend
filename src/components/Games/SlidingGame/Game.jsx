import { useState, useEffect } from "react";
import Grid from "./Grid";
import Menu from "./Menu.jsx";
import ScoreBoard from "./ScoreBoard.jsx";
import GridModel from "./models/Grid";
import SolverModel from "./models/Solver";
import styled from "styled-components";

let solution;
let timeouts = [];

function clearTimeouts() {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
}

Game.defaultProps = {
  gridDimension: 3,
  gameSize: 450,
};

export default function Game({ gridDimension, gameSize, thumbnailImg }) {
  const [data, setData] = useState({
    gridModel: GridModel.buildFromSize(gridDimension),
    moves: 0,
  });

  useEffect(() => {
    timeouts = [];
    solution = null;
  }, []);

  const hint = () => {
    if (!isSolving()) {
      if (!solution) {
        solution = new SolverModel(data.gridModel).solve();
      }
      if (solution && solution.length > 0) {
        let direction = solution.shift();
        move(direction);
      }
    }
  };

  const next = () => {
    clearTimeouts();
    solution = null;
    setData((prev) => ({
      gridModel: GridModel.buildFromSize(gridDimension),
      moves: 0,
    }));
  };

  const isSolving = () => {
    return timeouts.length ? true : false;
  };

  const move = (direction) => {
    data.gridModel.move(direction);

    setData((prev) => ({
      ...prev,
      gridModel: prev.gridModel,
      moves: prev.moves + 1,
    }));
  };

  const moveTile = (position) => {
    if (!isSolving()) {
      let changed = data.gridModel.moveTile(position);
      if (changed) {
        solution = null;
        setData((prev) => {
          return {
            ...prev,
            gridModel: prev.gridModel,
            moves: prev.moves + 1,
          };
        });
      }
    }
  };

  const solve = () => {
    if (!isSolving()) {
      if (!solution) {
        solution = new SolverModel(data.gridModel).solve();
      }
      if (solution && solution.length > 0) {
        let delay = 100;
        const updateTimeout = (n) => {
          timeouts.push(
            setTimeout(function () {
              move(solution[n]);
            }, delay)
          );
        };

        for (let i = 0; i < solution.length; i++) {
          updateTimeout(i);
          delay = delay + 100;
        }
      }
    }
  };

  return (
    <GameWrapper gameSize={gameSize} gridDimension={gridDimension}>
      <div id="game">
        <Grid
          model={data.gridModel}
          moveTile={moveTile}
          gameSize={gameSize}
          thumbnailImg={thumbnailImg}
        />
        <div id="aside">
          <ScoreBoard moves={data.moves} />
          <Menu
            next={next}
            hint={hint}
            solve={solve}
            isSolved={data.gridModel.isSolved()}
          />
        </div>
      </div>
    </GameWrapper>
  );
}

const GameWrapper = styled.div`
  // padding: 25px;
  #game {
    // margin: auto;
    // width: 670px;

    #grid {
      display: inline-block;
      width: ${(props) => `${props.gameSize}px`};
      margin-right: 20px;

      .tile {
        width: ${(props) => `${props.gameSize / props.gridDimension}px`};
        border: none;
        display: inline-block;
        cursor: pointer;
        vertical-align: top;
      }
    }

    #aside {
      vertical-align: top;
      display: inline-block;
      width: 200px;

      #scoreboard {
        .block {
          background: #a8a8a8;
          border: none;
          text-align: center;
          margin-bottom: 15px;
          border-radius: 4px;
          padding: 5px;

          label {
            display: block;
            text-transform: uppercase;
            color: $accentColor;
            font-weight: bold;
            font-size: 1.2em;
          }
          span {
            display: block;
            color: $accentColor;
            font-weight: bold;
            font-size: 1.5em;
          }
        }
      }

      #menu {
        button {
          display: block;
          width: 100%;
          background: #ffffff;
          border: solid 1px;
          padding: 20px;
          text-align: center;
          margin-bottom: 15px;
        }
        button[disabled] {
          color: grey;
        }
      }
    }
  }
`;
