import React, { useState } from "react";
import Popup from "./Popup";

function ProductTile({ product, products, index }) {
  const [showHeart, setShowHeart] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const changeAddHeart = (data, id) => {
    setShowHeart((prev) => !prev);
  };

  return (
    <div className="product_Container">
      {index === 1 ? (
        <>
          {isPopupOpen && (
            <Popup
              handleClose={togglePopup}
              product={product}
              products={products}
              gameType="guess-prize"
            />
          )}
          <button onClick={togglePopup}>© Ayush Yadav</button>
        </>
      ) : null}

      <img src={product.searchImage} className="product_Image" alt="prod" />
      <div className="movieStar">
        <div className="brand_Name">{product.brand}</div>
        <div
          onClick={() => changeAddHeart(product, product.productId)}
          className={`${showHeart ? "fillStar" : "emptyStar"}`}
        >
          {showHeart ? "❤️" : "♡"}
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

export default ProductTile;
