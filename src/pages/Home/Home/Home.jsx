import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import LowPriceOffer from '../lowPriceOffer/lowPriceOffer';
import AllProducts from '../Products/AllProducts';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <AllProducts/>
            <LowPriceOffer/>
        </div>
    );
};

export default Home;