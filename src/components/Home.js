import React from 'react'
import Header from './Header'
import ProductPage from './ProductListing'
import "./utils/home.css"

const Home = () => {
    return (
        <div className="productContainer">
           <Header/>
           <ProductPage/>
        </div>
    )
}

export default Home
