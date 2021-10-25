import { useState, useEffect } from "react";
import Grid from "./Grid";
import Menu from "./Menu.jsx";
import ScoreBoard from "./ScoreBoard.jsx";
import GridModel from "../../models/Grid";
import "./main.scss";
// import SolverModel from "../../models/Solver";

var gridModelInstance;
var solution;

var timeouts = [];
function clearTimeouts() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
}

// var Game = React.createClass({
// getInitialState: function () {
//   gridModelInstance = GridModel.buildFromSize(3);
//   return {
//     gridModel: gridModelInstance,
//     gridId: 1,
//     moves: 0,
//   };
// },

// next: function () {
//   clearTimeouts();
//   gridModelInstance = GridModel.buildFromSize(3);
//   solution = null;
//   this.setState({
//     gridModel: gridModelInstance,
//     gridId: this.state.gridId + 1,
//     moves: 0,
//   });
// },

// hint: function () {
//   if (!this.isSolving()) {
//     if (!solution) {
//       solution = new SolverModel(gridModelInstance).solve();
//     }
//     if (solution && solution.length > 0) {
//       var direction = solution.shift();
//       this.move(direction);
//     }
//   }
// },

// solve: function () {
//   if (!this.isSolving()) {
//     if (!solution) {
//       solution = new SolverModel(gridModelInstance).solve();
//     }
//     if (solution && solution.length > 0) {
//       var game = this;
//       var delay = 100;
//       for (var i = 0; i < solution.length; i++) {
//         (function (n) {
//           timeouts.push(
//             setTimeout(function () {
//               game.move(solution[n]);
//             }, delay)
//           );
//         })(i);
//         delay = delay + 100;
//       }
//     }
//   }
// },

// isSolving: function () {
//   return timeouts.length ? true : false;
// },

// move: function (direction) {
//   gridModelInstance.move(direction);
//   this.state.gridModel = gridModelInstance;
//   this.state.moves++;
//   this.setState(this.state);
// },

// moveTile: function (position) {
//   if (!this.isSolving()) {
//     var changed = gridModelInstance.moveTile(position);
//     if (changed) {
//       solution = null;
//       this.state.gridModel = gridModelInstance;
//       this.state.moves++;
//       this.setState(this.state);
//     }
//   }
// },

//     );
//   },
// });

// module.exports = Game;

export default function Game() {
  const [data, setData] = useState({
    gridModel: GridModel.buildFromSize(3),
    gridId: 1,
    moves: 0,
  });

  useEffect(() => {
    gridModelInstance = GridModel.buildFromSize(3);
  }, []);
  // const getInitialState = () => {
  //   gridModelInstance = GridModel.buildFromSize(3);
  //   return {
  //     gridModel: gridModelInstance,
  //     gridId: 1,
  //     moves: 0,
  //   };
  // };
  // useEffect(() => {
  //   gridModelInstance = GridModel.buildFromSize(3);
  //   setData();
  // }, []);

  const hint = () => {
    if (!isSolving()) {
      if (!solution) {
        // solution = new SolverModel(gridModelInstance).solve();
      }
      if (solution && solution.length > 0) {
        var direction = solution.shift();
        move(direction);
      }
    }
  };

  const next = () => {
    clearTimeouts();
    gridModelInstance = GridModel.buildFromSize(3);
    solution = null;
    setData((prev) => ({
      gridModel: gridModelInstance,
      gridId: prev.gridId + 1,
      moves: 0,
    }));
  };

  const isSolving = () => {
    return timeouts.length ? true : false;
  };

  const move = (direction) => {
    gridModelInstance.move(direction);

    setData((prev) => ({
      ...prev,
      gridModel: gridModelInstance,
      moves: prev.moves + 1,
    }));
  };

  const moveTile = (position) => {
    if (!isSolving()) {
      var changed = gridModelInstance.moveTile(position);
      if (changed) {
        solution = null;
        setData((prev) => ({
          ...prev,
          gridModel: gridModelInstance,
          moves: prev + 1,
        }));
      }
    }
  };

  const solve = () => {
    if (!isSolving()) {
      if (!solution) {
        // solution = new SolverModel(gridModelInstance).solve();
      }
      if (solution && solution.length > 0) {
        var delay = 100;
        for (var i = 0; i < solution.length; i++) {
          (function (n) {
            timeouts.push(
              setTimeout(function () {
                move(solution[n]);
              }, delay)
            );
          })(i);
          delay = delay + 100;
        }
      }
    }
  };

  return (
    <div id="game">
      <Grid key={data.gridId} model={data.gridModel} moveTile={moveTile} />
      <div id="aside">
        <ScoreBoard moves={data.moves} gridId={data.gridId} />
        <Menu
          next={next}
          hint={hint}
          solve={solve}
          isSolved={data.gridModel.isSolved()}
        />
      </div>
    </div>
  );
}

//export default Game;
