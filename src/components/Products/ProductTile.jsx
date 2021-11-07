import React, { useState } from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeHint } from "../../redux/actions/hintActions";
import { useHistory } from "react-router";

function ProductTile({ product, products, index, game }) {
  const [showHeart, setShowHeart] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const hintId = useSelector((state) => state.hint);
  const [gameOver, setgameOver] = useState(false);
  const history = useHistory()
  const [seconds, setSeconds] = useState(game==="guess-prize" ? 20 : 1);
  const universalProduct = useSelector((state) => state.hint.hint.universalProduct);
 
  const dispatch = useDispatch();
  const togglePopup = () => {
    setIsPopupOpen((prev) => {
      if (prev) {
        //if popup is to be closed
        if (!gameOver) localStorage.setItem('time', JSON.stringify({ seconds: seconds, pauseTime: Date.now() }))
        else{
            dispatch(removeHint());
            setTimeout(() => {
              history.push("/")
            }, 1000);
          if(game === "guess-prize"){
            setSeconds(20);
          }
          else {
            setSeconds(1);
          }
        }
      }
      else {
        //popup is to be opened
        if (!gameOver) {          
          const timeData = JSON.parse(localStorage.getItem('time'));
          if (timeData) {            
            const timeLeft = timeData.seconds;
            const pauseTime = timeData.pauseTime;
            const currentTime = Date.now();
            const timeElapsed = ((currentTime - pauseTime) / 1000 | 0) * (game === 'sliding-game' || game === 'memory-flip' ? -1 : 1);
            setSeconds((timeLeft - timeElapsed > 0) ? (timeLeft - timeElapsed) : 0);
          }
          else {
            const timeLeft = seconds;
            setSeconds((timeLeft >= 0) ? timeLeft : 1);
            //setSeconds(20)
          }
        }
        else{
          setSeconds(game==="guess-prize" ? 20 : 1);
          //setSeconds(20);
        }
      }
      return !prev;
    });
  };

  const changeAddHeart = (data, id) => {
    setShowHeart((prev) => !prev);
  };

  return (
    <div className="product_Container">

      

      {product._id === (hintId.hint.productId ? hintId.hint.productId : 0) ? (
        <>
          {isPopupOpen && (
            <Popup
              handleClose={togglePopup}
              product={product}
              products={products}
              gameType={game}
              seconds={seconds}
              setSeconds={setSeconds}
              setgameOver={setgameOver}
              universalProduct ={universalProduct}
            />
          )}         
          <span onClick={togglePopup} style={{fontWeight:"750"}}><img style={{width:"35%"}} src="/Images/treasure.gif" alt="treasure_chest" />Click Here</span>
          {/* <button onClick={togglePopup} style={{ backgroundColor: "#4CAF50" }}> GAME </button> */}
        </>
      ) : null}

      <img src={product.searchImage} className={product._id === hintId.hint.productId ? 'product_Image--gameTile' : "product_Image"} alt="prod" />
      
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
  );
}

// ProductTile.defaultProps = {
//   //gameType: "guess-prize"
//   //gameType: "memory-flip"
//   gameType: "sliding-game"
// };

export default ProductTile;
