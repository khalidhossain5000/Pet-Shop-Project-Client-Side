import React from 'react';
import NavBar from '../../Shared/Navbar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../pages/Home/Footer/Footer';
import ScrollToTop from '../../../ScrollToTop';

const RootLayout = () => {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <ScrollToTop/>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default RootLayout;