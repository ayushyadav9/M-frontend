import React from 'react'
import ExitingDeals from './ExitingDeals'
import HomeOffers from './HomeOffers'
import OffersHer from './OffersHer'
import Footer from "../Footer/Footer"


function Homepage() {
    return (
        <div style={{textAlign:"center"}}>
            <HomeOffers/>
            <ExitingDeals/>
            <OffersHer/>
            <Footer/>
        </div>
    )
}

export default Homepage
