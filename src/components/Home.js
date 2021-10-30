import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductPage from "./Products/ProductListing";
import styled from "styled-components";
import Hints from "./Hints/Hints";
import { useDispatch } from 'react-redux';
import { getHint } from "../redux/actions/hintActions";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const handleClose = () => {
    setIsPopupOpen((prev) => {return !prev})
  }

  const dispatch = useDispatch()
    useEffect(() => {
      if(!localStorage.getItem('token')){
        setIsPopupOpen(false)
      }
        dispatch(getHint())
        // eslint-disable-next-line
    }, [])


  return (
    <Container>
      <Header />
      {isPopupOpen && <Hints handleClose={handleClose}/>}
      <ProductPage />
    </Container>
  );
};

const Container = styled.div`
  //     width: 70%;
  //     max-width: 90rem;
  //     margin:3.5rem auto;
`;

export default Home;
