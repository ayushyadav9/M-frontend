import React, {useState} from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";


function ProductTile({ product, products, index, gameType }) {
  const [showHeart, setShowHeart] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const hintId = useSelector((state) => state.hint);
  
  const [seconds, setSeconds] = useState(1);
  

  const togglePopup = () => {
    setIsPopupOpen((prev) => {
      if (prev) {
        localStorage.setItem('time', JSON.stringify({ seconds: seconds, pauseTime: Date.now() }))
      }
      else {
        const timeData = JSON.parse(localStorage.getItem('time'));
        if (timeData) {
          const timeLeft = timeData.seconds;
          const pauseTime = timeData.pauseTime;
          const currentTime = Date.now();
          const timeElapsed = ((currentTime - pauseTime) / 1000 | 0) * (gameType === 'sliding-game' || gameType=== 'memory-flip' ? -1 : 1);
          setSeconds((timeLeft - timeElapsed > 0) ? (timeLeft - timeElapsed) : 0);
        }
        else {
          const timeLeft = seconds;
          setSeconds((timeLeft > 0) ? timeLeft : 0);
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
      {product._id ===(hintId.hint.productId?hintId.hint.productId:0) ? (
        <>
          {isPopupOpen && (
            <Popup
              handleClose={togglePopup}
              product={product}
              products={products}
              gameType={gameType}
              seconds={seconds}
              setSeconds={setSeconds}
            />
          )}
          <button onClick={togglePopup} style={{ backgroundColor: "#4CAF50" }}> GAME </button>
        </>
      ) : null}

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
  );
}

ProductTile.defaultProps = {
  //gameType: "guess-prize"
  //gameType: "memory-flip"
  gameType: "sliding-game"
};

export default ProductTile;
