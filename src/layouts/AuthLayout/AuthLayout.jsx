import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../Shared/Navbar/NavBar";

const AuthLayout = () => {
  return (
    <div>
        <header>
            <NavBar/>
        </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
