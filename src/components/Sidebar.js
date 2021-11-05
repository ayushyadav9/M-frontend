import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [classn, setclassn] = useState("collapsed");
  const handelsidebar = () => {
    if (classn === "expanded") {
      setclassn("collapsed");
    } else {
      setclassn("expanded");
    }
  };
  return (
    <>
      <div
        onClick={handelsidebar}
        className={` FreeShippingBanner-sidebar FreeShippingBanner-sidebar-${classn}`}
      >
        <div
          className={` FreeShippingBanner-arrow FreeShippingBanner-arrow-${classn}`}
        ></div>
        <p className="FreeShippingBanner-sidebar-content"> Myntra Heist !!!</p>
      </div>
      {classn === "expanded" && (
        <div className={`FreeShippingBanner-banner-${classn}`}>
          <div className="FreeShippingBanner-first-row">
            <div className="FreeShippingBanner-description">
              <div className="FreeShippingBanner-pre-header">MYNTRA TREASURE HUNT</div>
              <div className=" FreeShippingBanner-header FreeShippingBanner-header-primary">
                Welcome Professor,
              </div>
              <div className=" FreeShippingBanner-header FreeShippingBanner-header-secondary">
                Guess the hint and win amazing rewards
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
                To Play please Login first !! 
              </div>
            </div>
            <div className="FreeShippingBanner-signup">
              <Link className="FreeShippingBanner-button" to="/login">
                <div className="FreeShippingBanner-text">{localStorage.getItem("token")?"START HEIST": "SIGN UP TO HEIST"} &gt;</div>
              </Link>
            </div>
          </div>
          <div className="FreeShippingBanner-trust-builders">
            <div className="FreeShippingBanner-item">
              <span className="FreeShippingBanner-text">
                Earn Myntra coins  •  Compete among our users  •  Strengthen thinking skills
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
