import React from 'react';
import NavBar from '../../Shared/Navbar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../pages/Home/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default RootLayout;