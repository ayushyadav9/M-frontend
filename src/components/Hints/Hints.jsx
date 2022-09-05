import React from 'react'
import { useSelector } from 'react-redux';
import styled from "styled-components";


const Hints = ({handleClose}) => {
        
    const hint = useSelector((state) => state.hint);

    return (
    <PopupContainer>
        {hint.hint.hint._id&&
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          <div>
              <h1> Current Hint: </h1>
              <h2 className="hintStatement">{hint.hint.hint.hintStatement}</h2>
              <img style={{zIndex:"10",float: "right",marginRight:"7rem", width:"19rem"}} src="/images/hint.png" alt=""></img>
          </div>
        </div>
      </div>}
    </PopupContainer>
    )
}

export default Hints


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
    // height: auto;
    height: 60vh;
    max-height: 85vh;
    margin-top: calc(100vh - 85vh - 10px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
    background: -webkit-gradient(linear,right top,left top,from(#fef9e5),to(#fde3f3));
    background: linear-gradient(270deg,#fef9e5,#fde3f3);

  }
  .hintStatement{
    padding: 1em 3em;
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
