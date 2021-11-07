import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

GuessPrice.defaultProps = {
  maxValue: 10000
};

const markBuilder = (min, max, step) => {
  let t_marks = [];
  for (let i = min; i <= max; i += step) {
    t_marks = [...t_marks, { value: i, label: `${i / 1000}k` }];
  }
  return t_marks;
};

function GuessPrice(props) {
  const [value, setValue] = useState([props.maxValue * 0.4, props.maxValue * 0.6]);
  const [disabl, setdisabl] = useState(false)
  const ref = useRef(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [userScore, setuserScore] = useState(null)

  useEffect(() => {
    if(props.seconds===0){
      ref.current.click()
    }
  }, [props.seconds])


  const FinalResponse = () => {
    setdisabl(true)
    props.setgameOver(true);

    props.setSeconds(0)
    fetch("https://myntrah-backend.herokuapp.com/sendScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({gametype :"guess-price",data: value,correct:props.product.mrp})
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (result.success) {
                setuserScore(result)
              } else {
                console.log(result)
              }
            },
            (error) => {
              console.log(error)
            }
          );
          localStorage.removeItem('hint')
          localStorage.removeItem('time')
  };
  return (
    <GuessPriceWrapper>
      <div className="guessPrice__header">
        <h1>Guess the Price Range of the product</h1>
      </div>
      <div className="guessPrice__body">
        <ProductWrapper>
          <div className="body__left">
            <img
              src={props.product.searchImage}
              className="guessPrice__product_Image"
              alt="prod"
            />
            <div className="movieStar">
              <div className="brand_Name">{props.product.brand.slice(0,2) + "xxxxx"}</div>
            </div>
            <div className="addproduct_Info">{props.product.additionalInfo.slice(0,10) + "xxxxx"}</div>
            <div className="price_Show">
              <div className="price_view">
                {"RS." + "X".repeat(props.product.mrp.toString().length)}
              </div>
              {/* <div className="discount_view">{props.product.discountDisplayLabel}</div> */}
            </div>
          </div>
        </ProductWrapper>
        <GameDesciption>
          <h2 style={{ margin: "11%" }}>
            Guess the price range of the product! The closer you are and smaller the range
            the better your score!
          </h2>
          <button disabled={disabl} ref={ref} onClick={FinalResponse}>Submit Response</button>
          <h4>{userScore&&<>
            {userScore.message}<br/>
            Correct Price: {props.product.mrp} <br/>
            Your Current Score: {Math.round(userScore.data.currentScore)}<br/>
            Your Total Score: {Math.round(userScore.data.totalScore)}<br/>
          </>}</h4>
        </GameDesciption>
      </div>

      <Box sx={{ width: "80%", maxWidth: 500 }} style={{ margin: "0 auto" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          getAriaValueText={() => value}
          disableSwap
          min={0}
          max={props.maxValue}
          valueLabelDisplay="auto"
          marks={markBuilder(0, props.maxValue, 1000)}
        />
      </Box>
    </GuessPriceWrapper>
  );
}

export default GuessPrice;

const GuessPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  .guessPrice__header {
  }
  .guessPrice__body {
    display: flex;
  }
`;

const ProductWrapper = styled.div`
  //width: 25%;
  display: inline-block;
  margin: 5px;
  background: border-box;
  text-align: start;
  padding: 5px;
  cursor: pointer;

  .guessPrice__product_Image {
    width: 40%;
  }

  .movieStar {
    display: flex;
    height: 23px;
  }

  .brand_Name {
    margin: 0 auto;
    font-size: 16px;
    font-weight: 600;
    width: 64%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  .addproduct_Info {
    font-size: 13px;
    color: rgb(129 124 124);
    width: 64%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  .price_Show {
    display: flex;
  }

  .price_view {
    font-size: 13px;
    font-weight: 600;
    padding: 2px;
    margin: 0 auto;
  }

  .mrp_view {
    font-size: 12px;
    text-decoration: line-through;
    padding: 2px;
  }

  .discount_view {
    padding: 1px 8px;
    font-size: 11px;
    color: orange;
  }
  .fillStar {
    color: #f75e65;
    font-size: 30px;
    cursor: pointer;
    padding: 0px 0px 6px 51px;
  }
  .emptyStar {
    z-index: 0;
    color: #f75e65;
    font-size: 30px;
    cursor: pointer;
    position: relative;
    padding: 0px 0px 6px 51px;
    // bottom: 6px;
  }
  .body__left {
    text-align: center;
    margin-top: 2rem;
  }
`;

const GameDesciption = styled.div`
  word-wrap: break-word;
`;
