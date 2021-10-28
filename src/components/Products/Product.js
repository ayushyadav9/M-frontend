import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Genders, CheckedProduct, CheckedBrand, CheckedPrice } from "../utils/utils";
import { Space, Radio, Checkbox } from "antd";
import ProductTile from "./ProductTile";

const Product = () => {
  const products = useSelector((state) => state.allProducts.categoryProd);

  return (
    <>
      <FilterSort className="filter_sort">
        <div className="filter_Show">FILTERS</div>
        <div className="sort_Show">
          <div className="sort_title">Sort by : </div>
          <select name="sort_price" id="sort_price" className="form-control">
            <option value={""}>{"Recommended"}</option>
            <option value={1}>Low To High</option>
            <option value={2}>High To Low</option>
          </select>
        </div>
      </FilterSort>
      <ProductContent>
        <FilterShow>
          <FilterCateg>
            <Radio.Group>
              <Space direction="vertical">
                {Genders.map((gender_type, index) => {
                  return (
                    <Radio value={index + 1} key={index}>
                      {" "}
                      {gender_type.gender}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </FilterCateg>
          <FilterCateg>
            <div className="title">CATEGORY</div>
            {CheckedProduct.map((product_type, index) => {
              return (
                <div className="category_check" key={index}>
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
          </FilterCateg>
          <FilterCateg>
            <div className="title">BRAND</div>
            {CheckedBrand.map((brand_type, index) => {
              return (
                <div className="category_check" key={index}>
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
          </FilterCateg>
          <FilterCateg>
            <div className="title">PRICE</div>
            <Radio.Group>
              <Space direction="vertical">
                {CheckedPrice.map((price_val, index) => {
                  return (
                    <Radio className="choose_Name" value={index + 1} key={index}>
                      {price_val.priceTo === 4000
                        ? "Above " + price_val.priceTo
                        : "Rs. " + price_val.priceFrom + " to " + price_val.priceTo}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </FilterCateg>
        </FilterShow>

        {/* {isPopupOpen && <Popup handleClose={togglePopup} />} */}

        <ProductShow>
          {/* <button onClick={togglePopup}>CLICK</button> */}
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <ProductTile
                key={product._id}
                product={product}
                index={index}
                products={products}
              />
            ))}
        </ProductShow>
      </ProductContent>
    </>
  );
};

const FilterSort = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 80px 0px 0px 0px;
  border-bottom: 1px solid rgb(243, 241, 241);
  .filter_Show {
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0px 20px 30px;
  }
  .sort_Show {
    width: 25%;
    display: flex;
    padding-top: 10px;
  }
  .sort_title {
    width: 33%;
    font-size: 13px;
    padding: 7px 7px 0px 0px;
    @media only screen and (max-width: 945px) {
      width: 40%;
      font-size: 12px;
    }
    @media only screen and (max-width: 850px) {
      width: 45%;
      font-size: 12px;
    }
  }
  .form-control {
    width: 160px;
    height: 32px;
    padding: 0px 5px;
  }
`;
const FilterShow = styled.div`
  min-width: 18vw;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ProductContent = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 1000px) {
    .brand_Name {
      font-size: 13px;
    }

    .addproduct_Info {
      font-size: 12px;
    }
    .price_view {
      font-size: 11px;
    }

    .mrp_view {
      font-size: 11px;
    }

    .discount_view {
      font-size: 9px;
    }
  }
  @media only screen and (max-width: 945px) {
    .sort_title {
      width: 40%;
      font-size: 12px;
    }
    .discount_view {
      font-size: 9px;
    }
  }

  @media only screen and (max-width: 850px) {
    .sort_title {
      width: 45%;
      font-size: 12px;
    }
    .discount_view {
      font-size: 8px;
    }
  }
`;

const FilterCateg = styled.div`
  border-bottom: 1px solid rgb(243, 241, 241);
  border-right: 1px solid rgb(243, 241, 241);
  text-align: start;
  padding: 30px 30px;
  .category_check {
    display: flex;
    font-size: 13px;
    padding: 2px;
  }
  .choose_Name {
    padding: 0px 5px;
  }
  .title {
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProductShow = styled.div`
  // width: 83rem;
  padding: 10px;
  flex-wrap: wrap;

  .product_Container {
    width: 19%;
    display: inline-block;
    margin: 5px;
    background: border-box;
    text-align: start;
    padding: 5px;
    cursor: pointer;
  }

  .product_Image {
    width: 95%;
  }

  .movieStar {
    display: flex;
    height: 23px;
  }

  .brand_Name {
    font-size: 15px;
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
`;

export default Product;
