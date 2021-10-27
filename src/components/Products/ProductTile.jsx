import React, { useState } from "react";
import Popup from "./Popup";

function ProductTile({ products, index }) {
  const [showHeart, setShowHeart] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const changeAddHeart = (data, id) => {
    // if (!showHeart.includes(id)) {
    //   setShowHeart([...showHeart, id]);
    // } else {
    //   let showList = showHeart.filter((it) => it !== id);
    //   setShowHeart(showList);
    // }
    setShowHeart((prev) => !prev);
  };

  return (
    <div className="product_Container">
      {isPopupOpen && (
        <Popup handleClose={togglePopup} thumbnailImg={products.searchImage} />
      )}
      <button onClick={togglePopup}>© Ayush Yadav</button>

      <img src={products.searchImage} className="product_Image" alt="prod" />
      <div className="movieStar">
        <div className="brand_Name">{products.brand}</div>
        <div
          onClick={() => changeAddHeart(products, products.productId)}
          className={`${showHeart ? "fillStar" : "emptyStar"}`}
        >
          {showHeart ? "♥" : "♡"}
        </div>
      </div>
      <div className="addproduct_Info">{products.additionalInfo}</div>
      <div className="price_Show">
        <div className="price_view">{"RS." + products.price}</div>
        <div className="mrp_view">{"RS." + products.mrp}</div>
        <div className="discount_view">{products.discountDisplayLabel}</div>
      </div>
    </div>
  );
}

export default ProductTile;
