import React, { useState } from "react";
import { Filtertype, Icons } from "./utils/utils";
import "./utils/home.css"

const Header = () => {
  const [search, setsearch] = useState("");
  const onchangeSearch = (val) => {
    setsearch(val);
  };
  return (
    <div className="headerMenu">
      <div className="icon_Space">
        <img
          src="/Images/myntra.png"
          className="myntra_Icon_View"
          alt="Myntra"
        />
      </div>
      <div className="menu_space">
        {Filtertype.map((fil_type) => {
          return <div>{fil_type.type}</div>;
        })}
      </div>
      <div className="search_space">
        <div class="wrapper">
          <div class="search-icon">🔎︎</div>
          <input
            class="search"
            placeholder="Search for products, brand and more"
            type="text"
            onChange={(event) => onchangeSearch(event.target.value)}
            value={search}
          />
        </div>
      </div>
      <div className="profile_space">
        {Icons.map((iconsView, index) => {
          return (
            <div>
              <div className="watch_listView">
                <div>{iconsView.icon}</div>
                <div className="list_count"></div>
              </div>
              <div className="iconName">{iconsView.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
