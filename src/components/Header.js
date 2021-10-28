import React, { useState } from "react";
import { Filtertype, Icons } from "./utils/utils";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  const [search, setsearch] = useState("");
  const onchangeSearch = (val) => {
    setsearch(val);
  };
  return (
    <NavbarWrapper>
      <div className="navbar__iconSpace">
      <StyledLink to="/"><img src="/Images/myntra.png" className="myntra_Icon_View" alt="Myntra" /></StyledLink>
      </div>
      
      <div className="navbar__menuSpace">
        {Filtertype.map((fil_type, index) => {
          return <div key={index}>{fil_type.type}</div>;
        })}
      </div>
      <div className="navbar__searchSpace">
        <div className="wrapper">
          <div className="search-icon">🔎︎</div>
          <input
            className="navbar__searchBar"
            placeholder="Search for products, brand and more"
            type="text"
            onChange={(event) => onchangeSearch(event.target.value)}
            value={search}
          />
        </div>
      </div>
      <div className="navbar__profileSpace">
        {Icons.map((iconsView, index) => {
          return (
            <StyledLink to={iconsView.link} key={index}>
            <div >
              <div className="profileSpace__watchListView">
                <div>{iconsView.icon}</div>
                <div className="profileSpace__listCount"></div>
              </div>
              <div className="profileSpace__iconName">{iconsView.name}</div>
            </div>
            </StyledLink>
          );
        })}
      </div>
    </NavbarWrapper>
  );
};

export default Header;

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  position: fixed;
  background: white;
  box-shadow: 4px 5px 5px -1px rgb(231 228 228 / 67%);

  .myntra_Icon_View {
    width: 45%;
    padding-top: 5px;
  }

  .navbar__iconSpace {
    width: 12%;
  }
  .navbar__menuSpace {
    width: 30rem;
    display: flex;
    justify-content: space-evenly;
    font-size: 13px;
    font-weight: 600;
  }
  .navbar__searchSpace {
    width: 40%;
    text-align: center;

    .wrapper {
      position: relative;
      display: flex;
      min-width: 100px;
    }
    .navbar__searchBar {
      border: 1px solid #e6e3e3;
      border-radius: 5px;
      height: 25px;
      width: 70%;
      padding: 2px 23px 2px 30px;
      outline: 0;
      background-color: #e6e3e3;
    }
    .search-icon {
      position: absolute;
      top: 5px;
      left: 8px;
      width: 14px;
    }

    .search:hover,
    .search:focus {
      border: 1px solid #e6e3e3;
      background-color: #e6e3e3;
    }
  }
  .navbar__profileSpace {
    width: 20%;
    display: flex;
    justify-content: space-evenly;

    .profileSpace__watchListView {
      display: flex;
      justify-content: center;
    }

    .profileSpace__listCount {
      font-size: 9px;
      background: #f75e65;
      padding: 1px;
      color: white;
      border-radius: 34px;
      width: 12px;
      height: 12px;
      font-weight: 600;
    }

    .profileSpace__iconName {
      font-size: 10px;
    }
  } 
`;
const StyledLink = styled(Link)`
  color:black
`;
