import React from "react";
import Header from "./Header";
import ProductPage from "./Products/ProductListing";
import styled from "styled-components";
// import "./utils/home.css";
const Home = () => {
  return (
    <Container>
      <Header />
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
