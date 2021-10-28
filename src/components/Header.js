import React, { useState } from "react";
import { navData, Icons } from "./utils/utils";
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
        <StyledLink to="/">
          <img src="/Images/myntra.png" className="myntra_Icon_View" alt="Myntra" />
        </StyledLink>
      </div>

      <div className="navbar__menuSpace">
        {navData.map((fil_type, index) => {
          return (
            <LinkContainer key={index}>
              <StyledLink to={`/gender/${fil_type.link}`}>
                <div style={{textAlign:"center"}} >{fil_type.title}</div>
              </StyledLink>
              <SearchDiv >
                <h5 className="navLinks3">{fil_type.sub}</h5>
                {fil_type.list.map((el,z)=>{
                  return(
                        <Navtitle key = {z}className="navLinks2">
                          <StyledLink to={`/category/${el.link}`}>{el.name.toUpperCase()}</StyledLink>
                        </Navtitle>     
                      )
                    })}    
              </SearchDiv>
            </LinkContainer>
          );
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
            <StyledLinks to={iconsView.link} key={index}>
              <div>
                <div className="profileSpace__watchListView">
                  <div>{iconsView.icon}</div>
                  <div className="profileSpace__listCount"></div>
                </div>
                <div className="profileSpace__iconName">{iconsView.name}</div>
              </div>
            </StyledLinks>
          );
        })}
      </div>
    </NavbarWrapper>
  );
};

export default Header;

const SearchDiv=styled.div`
    display: none;
    position: absolute;
    width: 12%;
    height: 42vh;
    margin-top: 12px;
    marging-left:-20px;
    background-color: white;
    text-align: left;
    transition-delay:20s;
    transition-duration: 2s;
    padding-top:20px;
    padding-left:20px;
    .navLinks3{
      text-decoration: none;
      color:rgb(243, 73, 101) ;
      font-size: 12px;      
  }
`
const Navtitle = styled.p`
    font-size: 12px;
    background-color: white;
    &:hover ${SearchDiv}{
        display :block;
       transition-duration: 2s;
       transition-delay:20s;
    }
    .navLinks2{
      text-decoration: none;
      color:rgb(40,44,63) ;
      font-size: 13.5px;
      margin-left: 20px;
      padding-left: 50px;
  }
  .navLinks2:hover{
      color:black ;
      font-weight: 600;
      font-size: 14px;
  }
`

const LinkContainer= styled.div`
    width: 30%;
    margin:2%;
    margin-top: 16px;
    height: 5vh;
    background-color:white;
    padding-top: 4px;

&:hover{
  
    border-bottom: 4px solid #f04d68;
    cursor: pointer;
    
}
&:hover ${SearchDiv}{
transition-delay:20s;
transition-duration: 2s;
 display :block;
}
`


const NavbarWrapper = styled.div`
  display: flex;
  width: 100%;
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
    margin: 2rem;
    width: 16%;
  }
  .navbar__menuSpace {
    width: 30rem;
    margin-right: 10rem;
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
  color: black;
`;

const StyledLinks = styled(Link)`
  color: black;
  margin:10px
`;
