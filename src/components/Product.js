import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Genders,CheckedProduct,CheckedBrand,CheckedPrice,} from "./utils/utils";
import { Space, Radio, Checkbox } from "antd";
import "./utils/home.css"

const Product = () => {
  const [showHeart, setShowHeart] = useState([]);
  const products = useSelector((state) => state.allProducts.products);

  const changeAddHeart = (data, id) => {
    if (!showHeart.includes(id)) {
      setShowHeart([...showHeart, id]);
    } else {
      let showList = showHeart.filter((it) => it !== id);
      setShowHeart(showList);
    }
  };
  return (
    <>
      <div className="filter_sort">
        <div className="filter_Show">FILTERS</div>
        <div className="sort_Show">
          <div className="sort_title">Sort by : </div>
          <select name="sort_price" id="sort_price" className="form-control">
            <option value={""}>{"Recommended"}</option>
            <option value={1}>Low To High</option>
            <option value={2}>High To Low</option>
          </select>
        </div>
      </div>
      <div className="content">
        <div className="options_Show">
          <div className="gender_Choice">
            <Radio.Group>
              <Space direction="vertical">
                {Genders.map((gender_type, index) => {
                  return <Radio value={index + 1}>{gender_type.gender}</Radio>;
                })}
              </Space>
            </Radio.Group>
          </div>
          <div className="gender_Choice">
            <div className="title">CATEGORY</div>
            {CheckedProduct.map((product_type, index) => {
              return (
                <div className="category_check">
                  <Checkbox
                    checked={false}
                    name={product_type.product_name}
                    value={index}
                  />
                  <div className="choose_Name">
                    {product_type.product_name + "  " + product_type.number}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="gender_Choice">
            <div className="title">BRAND</div>
            {CheckedBrand.map((brand_type, index) => {
              return (
                <div className="category_check">
                  <Checkbox
                    checked={false}
                    name={brand_type.product_name}
                    value={index}
                  />
                  <div className="choose_Name">
                    {brand_type.product_name + " " + brand_type.number}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="gender_Choice">
            <div className="title">PRICE</div>
            <Radio.Group>
              <Space direction="vertical">
                {CheckedPrice.map((price_val, index) => {
                  return (
                    <Radio className="choose_Name" value={index + 1}>
                      {price_val.priceTo === 4000
                        ? "Above " + price_val.priceTo
                        : "Rs. " +
                          price_val.priceFrom +
                          " to " +
                          price_val.priceTo}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="product_Show">
          {products &&
            products.length > 0 &&
            products.map((products, index) => {
              return (
                <div className="product_Container">
                  <img
                    src={products.searchImage}
                    className="product_Image"
                    alt="prod"
                  />
                  <div className="movieStar">
                    <div className="brand_Name">{products.brand}</div>
                    <div
                      onClick={() =>
                        changeAddHeart(products, products.productId)
                      }
                      className={`${
                        showHeart && showHeart.includes(products.productId)
                          ? "fillStar"
                          : "emptyStar"
                      }`}
                    >
                      {showHeart && showHeart.includes(products.productId)
                        ? "❤"
                        : "♡"}
                    </div>
                  </div>
                  <div className="addproduct_Info">
                    {products.additionalInfo}
                  </div>
                  <div className="price_Show">
                    <div className="price_view">{"RS." + products.price}</div>
                    <div className="mrp_view">{"RS." + products.mrp}</div>
                    <div className="discount_view">
                      {products.discountDisplayLabel}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
