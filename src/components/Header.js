import React from "react";
import { navData } from "./utils/utils";
import "./myntra.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header class="desktop-container" id="desktop-header-cnt">
      <div class="desktop-bound">
        <div class="desktop-logoContainer">
          <Link to="/" class="myntraweb-sprite desktop-logo sprites-headerLogo">{" "}</Link>
        </div>
        <nav class="desktop-navbar">
          <div class="desktop-navLinks">
            {navData.map((item, idx) => {
              return (
                <div key={idx} class="desktop-navContent">
                  <div class="desktop-navLink">
                    <Link to={`/gender/${item.link}`} data-group="men" data-color="#ee5f73" data-type="navElements" style={{ borderBottomColor: `${item.color}` }}class="desktop-main">
                      {item.title}
                    </Link>
                    <div class="desktop-backdropStyle">
                      <div class="desktop-paneContent">
                        <ul class="desktop-navBlock">
                          <li>
                            <Link to={`/gender/${item.link}`} style={{ color: `${item.color}` }} class="desktop-categoryName">
                              {item.title}
                            </Link>
                          </li>
                          {item.list.map((subitem, i) => {
                            return (
                              <li key={i}>
                                <Link to={`/category/${subitem.link}`} style={{ color: "black" }} class="desktop-categoryLink">
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
        <div class="desktop-actions">
          <div class="desktop-user">
            <div class="desktop-userIconsContainer">
              <span class="myntraweb-sprite desktop-iconUser sprites-headerUser"></span>
              <span class="desktop-userTitle">Profile</span>
            </div>
            <div class="desktop-userActions">
            <div class="desktop-userActionsArrow"></div>
              <div class="desktop-userActionsContent">
                <div class="desktop-contentInfo">
                  <div class="desktop-infoTitle">Welcome</div>
                  <div class="desktop-infoEmail">
                    To access account and manage orders
                  </div>
                </div>
                <div>
                  <div class="desktop-getUserInLinks desktop-getInLinks">
                    <Link to="/login" data-track="login"class="desktop-linkButton">login / Signup</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/wishlist" class="desktop-wishlist">
            <span class="myntraweb-sprite desktop-iconWishlist sprites-headerWishlist"></span>
            <span class="desktop-userTitle">Wishlist</span>
          </a>
          <a href="/checkout/cart" class="desktop-cart">
            <span class="myntraweb-sprite desktop-iconBag sprites-headerBag"></span>
            <span class="desktop-badge  desktop-grey">0</span>
            <span class="desktop-userTitle">Bag</span>
          </a>
        </div>
        <div class="desktop-query">
          <input placeholder="Search for products, brands and more" class="desktop-searchBar"value=""/>
          <a class="desktop-submit" href="/">
            <span class="myntraweb-sprite desktop-iconSearch sprites-search"></span>
          </a>
        </div>
      </div>
    </header>
  );
};


export default Header;
