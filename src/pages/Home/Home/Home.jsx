import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import LowPriceOffer from '../lowPriceOffer/lowPriceOffer';
import AllProducts from '../Products/AllProducts';
import HowItWorks from '../HowItworks/HowItWorks';
import Promo from '../PromoSection.jsx/Promo';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <AllProducts/>
            <LowPriceOffer/>
            <HowItWorks/>
            <Promo></Promo>
        </div>
    );
};

export default Home;