import styled from "styled-components";
import SlidingGame from "../Games/SlidingGame/Game";
import MemoryFlipGame from "../Games/MemoryFlipGame/MemoryFlip";
import GuessPrice from "../Games/GuessPriceGame/GuessPrice";
import UTimer from "../utils/UTimer";
import Dtimer from "../utils/DTimer"

const Popup = ({ handleClose, product, products, gameType, seconds,setSeconds}) => {
  
  return (
    <PopupContainer>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>

          {gameType === "memory-flip" && <MemoryFlipGame products={products} />}
          {gameType === "sliding-game" && (
            <SlidingGame thumbnailImg={product.searchImage} seconds={seconds} setSeconds={setSeconds}/>
          )}
          {gameType === "guess-prize" && (
            <GuessPrice seconds={seconds} setSeconds={setSeconds} product={product} maxValue={10000} />
          )}

          {/* Timer */}
          <span style={{ textAlign: "center" }}>
            { (gameType === "memory-flip" || gameType === "sliding-game")?  <UTimer seconds={seconds} setSeconds={setSeconds}/>
            :<Dtimer seconds={seconds} setSeconds={setSeconds}/>}
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
