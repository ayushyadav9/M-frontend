import React from "react";
import { navData } from "./utils/utils";
import "./myntra.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="desktop-container" id="desktop-header-cnt">
      <div className="desktop-bound">
        <div className="desktop-logoContainer">
          <Link to="/" className="myntraweb-sprite desktop-logo sprites-headerLogo">{" "}</Link>
        </div>
        <nav className="desktop-navbar">
          <div className="desktop-navLinks">
            {navData.map((item, idx) => {
              return (
                <div key={idx} className="desktop-navContent">
                  <div className="desktop-navLink">
                    <Link to={`/gender/${item.link}`} data-group="men" data-color="#ee5f73" data-type="navElements" style={{ borderBottomColor: `${item.color}` }} className="desktop-main">
                      {item.title}
                    </Link>
                    <div className="desktop-backdropStyle">
                      <div className="desktop-paneContent">
                        <ul className="desktop-navBlock">
                          <li>
                            <Link to={`/gender/${item.link}`} style={{ color: `${item.color}` }} className="desktop-categoryName">
                              {item.title}
                            </Link>
                          </li>
                          {item.list.map((subitem, i) => {
                            return (
                              <li key={i}>
                                <Link to={`/category/${subitem.link}`} style={{ color: "black" }} className="desktop-categoryLink">
                                  {subitem.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
        <div className="desktop-actions">
          <div className="desktop-user">
            <div className="desktop-userIconsContainer">
              <span className="myntraweb-sprite desktop-iconUser sprites-headerUser"></span>
              <span className="desktop-userTitle">Profile</span>
            </div>
            <div className="desktop-userActions">
              <div className="desktop-userActionsArrow"></div>
              <div className="desktop-userActionsContent">
                <div className="desktop-contentInfo">
                  <div className="desktop-infoTitle">Welcome</div>
                  <div className="desktop-infoEmail">
                    To access account and manage orders
                  </div>
                </div>
                <div>
                  {localStorage.getItem("token") ? (<div className="desktop-getUserInLinks desktop-getInLinks" onClick={() => localStorage.clear()}>
                    <Link to="/login" data-track="login" className="desktop-linkButton">Logout</Link>
                  </div>) : (
                    <div className="desktop-getUserInLinks desktop-getInLinks">
                      <Link to="/login" data-track="login" className="desktop-linkButton">login / Signup</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <a href="/wishlist" className="desktop-wishlist">
            <span className="myntraweb-sprite desktop-iconWishlist sprites-headerWishlist"></span>
            <span className="desktop-userTitle">Wishlist</span>
          </a>
          <a href="/checkout/cart" className="desktop-cart">
            <span className="myntraweb-sprite desktop-iconBag sprites-headerBag"></span>
            <span className="desktop-badge  desktop-grey">0</span>
            <span className="desktop-userTitle">Bag</span>
          </a>
        </div>
        <div className="desktop-query">
          <input placeholder="Search for products, brands and more" className="desktop-searchBar" value="" onChange={() => { }} />
          <a className="desktop-submit" href="/">
            <span className="myntraweb-sprite desktop-iconSearch sprites-search"></span>
          </a>
        </div>
      </div>
    </header>
  );
};


export default Header;
