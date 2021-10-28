import styled from "styled-components";
import SlidingGame from "../Games/SlidingGame/Game";
import MemoryFlipGame from "../Games/MemoryFlipGame/MemoryFlip";
import GuessPrice from "../Games/GuessPriceGame/GuessPrice";
import Timer from "../Games/SlidingGame/Timer";

const Popup = ({ handleClose, product, products, gameType }) => {
  return (
    <PopupContainer>
      {console.log("Game Clicked")}
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          {/* <div style={{ float: "left", marginLeft: "70px" }}>
            <SlidingGame thumbnailImg={product.searchImage} />
            Product Tile on Popup
            <div
              className="product_Container"
              style={{ marginLeft: "100px", paddingLeft: "10px", paddingTop: "10px" }}
            >
              <img src={product.searchImage} className="product_Image" alt="prod" />

              <div className="movieStar">
                <div className="brand_Name">{product.brand}</div>
              </div>
              <div className="addproduct_Info">{product.additionalInfo}</div>
              <div className="price_Show">
                <div className="price_view">{"RS." + product.price}</div>
                <div className="mrp_view">{"RS." + product.mrp}</div>
                <div className="discount_view">{product.discountDisplayLabel}</div>
              </div>
            </div>
          </div>{" "} */}

          {/* <div style={{ float: "left", marginLeft: "70px" }}>
            <MemoryFlipGame products={products} />
          </div> */}
          {gameType === "memory-flip" && <MemoryFlipGame products={products} />}
          {gameType === "sliding-game" && (
            <SlidingGame thumbnailImg={product.searchImage} />
          )}
          {gameType === "guess-prize" && (
            <GuessPrice product={product} maxValue={10000} />
          )}

          {/* Timer */}
          <span style={{ textAlign: "center" }}>
            <Timer />
          </span>
        </div>
      </div>
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.div`
  .popup-box {
    z-index: 1;
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .box {
    position: relative;
    width: 70%;
    margin: 0 auto;
    height: auto;
    max-height: 85vh;
    margin-top: calc(100vh - 85vh - 10px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
  }

  .close-icon {
    content: "x";
    cursor: pointer;
    position: fixed;
    right: calc(15% - 30px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }
`;
