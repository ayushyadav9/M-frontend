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

function formatTime(s) {
  let min = ((s / 60) | 0).toString().padStart(2, "0");
  let sec = (s % 60).toString().padStart(2, "0");
  return min + ":" + sec;
}

Game.defaultProps = {
  gridDimension: 3,
  gameSize: 450,
};

export default function Game({ gridDimension, gameSize, product, seconds, setSeconds, setgameOver }) {
  const [data, setData] = useState({
    gridModel: GridModel.buildFromSize(gridDimension),
    moves: 0,
  });

  const [isSolUsed, setisSolUsed] = useState(false)
  const [score, setscore] = useState(0)
  const [timeTaken, settimeTaken] = useState(null)
  const [currentScore, setcurrentScore] = useState(2000);
  const [showHeart, setShowHeart] = useState(false);

  const changeAddHeart = (data, id) => {
    setShowHeart((prev) => !prev);
  };

  useEffect(() => {
    timeouts = [];
    solution = null;
  }, []);

  useEffect(() => {
    if (currentScore !== 0) {
      if (seconds !== 0 && seconds%10===0) {
        setcurrentScore(Math.round((1 / Math.sqrt(seconds) + (data.moves !== 0 ? (2 / Math.pow(data.moves, 0.5)) : 1)) * 1000))
      }
    }
    // eslint-disable-next-line
  }, [data.moves, seconds])

  useEffect(() => {
    if (data.gridModel.isSolved()) {
      //Post Req
      setgameOver(true);
      settimeTaken(seconds)
      fetch("https://myntrah-backend.herokuapp.com/sendScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ gametype: "sliding", moves: data.moves, time: seconds, isSolused: isSolUsed })
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
      setTimeout(() => {
        setData((prev) => ({
          ...prev,
          gridModel: prev.gridModel,
          moves: 0,
        }));
      }, 10000);

      setSeconds(0);
      //Remove Hint if the puzzle is solved
      localStorage.removeItem('hint')
      localStorage.removeItem('time')
      //Gugad
      setTimeout(() => {
        alert("Hurray Solved !")
      }, 500);
    }
    // eslint-disable-next-line
  }, [data.gridModel.isSolved()])

  const hint = () => {
    if (window.confirm("Using hint will panalize you!")) {
      if (!isSolving()) {
        if (!solution) {
          solution = new SolverModel(data.gridModel).solve();
        }
        if (solution && solution.length > 0) {
          let direction = solution.shift();
          move(direction);
          setData((prev) => ({
            ...prev,
            gridModel: prev.gridModel,
            moves: prev.moves + 4,
          }));
        }
      }
    }
  };

  const next = () => {
    clearTimeouts();
    solution = null;
    setData((prev) => ({
      gridModel: GridModel.buildFromSize(gridDimension),
      moves: prev.moves,
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
    if (window.confirm("You will not be awarded for this puzzle!!!!")) {
      setcurrentScore(0)
      setisSolUsed(true);//Solve it for me Used
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
    }
  };
  return (
    <GameWrapper gameSize={gameSize} gridDimension={gridDimension}>
      <div id="game">
        <Grid
          model={data.gridModel}
          moveTile={moveTile}
          gameSize={gameSize}
          thumbnailImg={product.searchImage}
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
      <div id="score">
        <h2 > Your Current Score {currentScore}
          <br /> {score ? <span>{`Your Total score: ${Math.round(score)}`}</span> : ""}
          <br /> {timeTaken && <span>Time Taken: {formatTime(timeTaken)}</span>}
        </h2>
      </div>

      <div className="product_Container">
        <img src={product.searchImage} className="product_Image" alt="prod" />
        <div className="movieStar">
          <div className="brand_Name">{product.brand}</div>
          <div
            onClick={() => changeAddHeart(product, product.productId)}
            className={`${showHeart ? "fillStar" : "emptyStar"}`}
          >
            {showHeart ? "♥️" : "♡"}
          </div>
        </div>
        <div className="addproduct_Info">{product.additionalInfo}</div>
        <div className="price_Show">
          <div className="price_view">{"RS." + product.price}</div>
          <div className="mrp_view">{"RS." + product.mrp}</div>
          <div className="discount_view">{product.discountDisplayLabel}</div>
        </div>
      </div>


    </GameWrapper>
  );
}

const GameWrapper = styled.div`
  // padding: 25px;
  #game {
    float:left;
    // margin: auto;
    // width: 670px;
    #score{
      margin-left: 781px;
      float:right;
    }
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
