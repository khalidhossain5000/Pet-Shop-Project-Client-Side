import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import LowPriceOffer from '../lowPriceOffer/lowPriceOffer';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <LowPriceOffer/>
        </div>
    );
};

export default Home;