import React, { useEffect, useState } from "react";
import ProductPage from "./Products/ProductListing";
import Hints from "./Hints/Hints";
import { useDispatch } from "react-redux";
import { getHint } from "../redux/actions/hintActions";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./myntra.css"

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [classn, setclassn] = useState("collapsed");
  const handleClose = () => {
    setIsPopupOpen((prev) => {
      return !prev;
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsPopupOpen(false);
    }
    dispatch(getHint());
    // eslint-disable-next-line
  }, []);
  const handelsidebar = () => {
    if (classn === "expanded") {
      setclassn("collapsed");
    } else {
      setclassn("expanded");
    }
  };

  return (
    <>
      <Header />

      {isPopupOpen && <Hints handleClose={handleClose}/>}
      <div
        onClick={handelsidebar}
        className={` FreeShippingBanner-sidebar FreeShippingBanner-sidebar-${classn}`}>
        <div
          className={` FreeShippingBanner-arrow FreeShippingBanner-arrow-${classn}`}
        ></div>
        <p className="FreeShippingBanner-sidebar-content"> Myntra  Heist  69</p>
      </div>
      {classn==="expanded" &&
      <div className={`FreeShippingBanner-banner-${classn}`}>
        <div className="FreeShippingBanner-first-row">
          <div className="FreeShippingBanner-description">
            <div className="FreeShippingBanner-pre-header">AVAIL FLAT</div>
            <div className=" FreeShippingBanner-header FreeShippingBanner-header-primary">
              ₹500 OFF
            </div>
            <div className=" FreeShippingBanner-header FreeShippingBanner-header-secondary">
              + FREE DELIVERY
            </div>
          </div>
          <div className="FreeShippingBanner-image">
            <img
              className="FreeShippingBanner-imageContent"
              src="/images/tt.png"
              alt=""
            />
          </div>
        </div>
        <div className="FreeShippingBanner-second-row">
          <div className="FreeShippingBanner-coupon">
            <div>
              <span className="FreeShippingBanner-text">Coupon Code:</span>
              <span className="FreeShippingBanner-code">HAGRYA69</span>
            </div>
            <div className="FreeShippingBanner-footer">
              {" "}
              Applicable on your first order
            </div>
          </div>
          <div className="FreeShippingBanner-signup">
            <Link className="FreeShippingBanner-button" to="/login">
              <div className="FreeShippingBanner-text">SIGN UP NOW &gt;</div>
            </Link>
          </div>
        </div>
        <div className="FreeShippingBanner-trust-builders">
          <div className="FreeShippingBanner-item">
            <span className="FreeShippingBanner-text">
              Easy Exchanges &amp; Returns
            </span>
          </div>
        </div>
      </div>}

      <ProductPage />
    </>
  );
};

// const Container = styled.div`
//   .FreeShippingBanner-banner-expanded {
//     position: fixed;
//     bottom: 130px;
//     right: 0;
//     width: 576px;
//     height: 288px;
//     background-image: -webkit-gradient(
//       linear,
//       right top,
//       left top,
//       from(#fef9e5),
//       to(#fde3f3)
//     );
//     background-image: linear-gradient(270deg, #fef9e5, #fde3f3);
//     z-index: 6;
//     font-family: Whitney;
//     color: #3e4152;
//     cursor: default;
//   }

//   .FreeShippingBanner-first-row {
//     display: table;
//     table-layout: auto;
//     height: 52%;
//     width: 100%;
//   }

//   .FreeShippingBanner-second-row {
//     display: table;
//     table-layout: auto;
//     height: 32%;
//     width: 100%;
//   }

//   .FreeShippingBanner-description {
//     display: table-cell;
//     vertical-align: middle;
//     padding: 24px 0 0 40px;
//   }

//   .FreeShippingBanner-description > .FreeShippingBanner-pre-header {
//     font-weight: 500;
//     font-size: 12px;
//   }

//   .FreeShippingBanner-description > .FreeShippingBanner-header {
//     font-weight: 700;
//   }

//   .FreeShippingBanner-description > .FreeShippingBanner-header-primary {
//     font-size: 48px;
//   }

//   .FreeShippingBanner-description > .FreeShippingBanner-header-secondary {
//     font-size: 34px;
//   }

//   .FreeShippingBanner-image {
//     display: table-cell;
//     vertical-align: middle;
//     padding: 24px 40px 0 0;
//   }

//   .FreeShippingBanner-imageContent {
//     width: 150px;
//     height: 120px;
//   }

//   .FreeShippingBanner-coupon {
//     display: table-cell;
//     vertical-align: middle;
//     padding-left: 40px;
//   }

//   .FreeShippingBanner-coupon .FreeShippingBanner-text {
//     font-weight: 500;
//     font-size: 15px;
//     margin-top: 8px;
//   }

//   .FreeShippingBanner-coupon .FreeShippingBanner-code {
//     margin-left: 12px;
//     font-size: 18px;
//     font-weight: 700;
//     cursor: text;
//     -webkit-user-select: all;
//     -moz-user-select: all;
//     -ms-user-select: all;
//     user-select: all;
//   }

//   .FreeShippingBanner-coupon > .FreeShippingBanner-footer {
//     font-size: 12px;
//     margin-top: 4px;
//   }

//   .FreeShippingBanner-signup {
//     display: table-cell;
//     text-align: center;
//     vertical-align: middle;
//     padding-right: 40px;
//   }

//   .FreeShippingBanner-signup .FreeShippingBanner-button {
//     width: 172px;
//     height: 48px;
//     border-radius: 4px;
//     background-color: #ff3f6c;
//     color: #fff;
//     display: inline-block;
//     vertical-align: middle;
//     cursor: pointer;
//   }

//   .FreeShippingBanner-signup .FreeShippingBanner-button :hover {
//     background-color: #cf3f6c;
//     border-radius: 4px;
//   }

//   .FreeShippingBanner-signup
//     .FreeShippingBanner-button
//     .FreeShippingBanner-text {
//     font-size: 16px;
//     font-weight: 600;
//     height: 100%;
//     width: 100%;
//     display: inline-block;
//     line-height: 48px;
//   }

//   .FreeShippingBanner-trust-builders {
//     display: table;
//     table-layout: auto;
//     border-top: 1px solid #d3d3d3;
//     height: 16%;
//     width: 100%;
//   }

//   .FreeShippingBanner-trust-builders .FreeShippingBanner-item {
//     display: table-cell;
//     text-align: center;
//     vertical-align: middle;
//   }

//   .FreeShippingBanner-trust-builders .FreeShippingBanner-icon {
//     width: 24px;
//     height: 24px;
//     text-align: center;
//     vertical-align: middle;
//   }

//   .FreeShippingBanner-trust-builders .FreeShippingBanner-text {
//     font-size: 13px;
//     font-weight: 500;
//     margin-left: 12px;
//   }

//   .FreeShippingBanner-sidebar {
//     position: fixed;
//     bottom: 130px;
//     width: 44px;
//     height: 288px;
//     background-color: #535766;
//     z-index: 6;
//     color: #fff;
//     letter-spacing: 1px;
//     cursor: pointer;
//   }

//   .FreeShippingBanner-sidebar-content {
//     -webkit-writing-mode: vertical-rl;
//     -ms-writing-mode: tb-rl;
//     writing-mode: vertical-rl;
//     -webkit-transform: rotate(-180deg);
//     transform: rotate(-180deg);
//     width: 36px;
//     padding: 4px;
//     height: 200px;
//     vertical-align: middle;
//     text-align: center;
//     font-size: 24px;
//     font-weight: 500;
//     -webkit-margin-after: 0;
//     margin-block-end: 0;
//     -webkit-margin-before: 0;
//     margin-block-start: 0;
//     color: #fcfcfc;
//     display: inline-block;
//   }

//   .FreeShippingBanner-sidebar-collapsed {
//     right: 0;
//   }

//   .FreeShippingBanner-sidebar-expanded {
//     right: 575px;
//   }

//   .FreeShippingBanner-arrow {
//     width: 0;
//     height: 0;
//     margin: 24px 16px;
//     border-top: 12px solid transparent;
//     border-bottom: 12px solid transparent;
//   }

//   .FreeShippingBanner-arrow-expanded {
//     border-left: 14px solid #fff;
//   }

//   .FreeShippingBanner-arrow-collapsed {
//     border-right: 14px solid #fff;
//   }

//   .FreeShippingBanner-spinner {
//     position: relative;
//     top: 50%;
//     left: 50%;
//     margin-left: -12px;
//     margin-top: -12px;
//   }
// `;

export default Home;
