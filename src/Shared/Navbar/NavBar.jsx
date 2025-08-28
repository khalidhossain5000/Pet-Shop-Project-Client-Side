import React from "react";
import logo from "../../assets/logo/logo-header.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user ,logoutUser} = useAuth();
  const handleLogout=()=>{
    logoutUser()
    .then((result) => {
      console.log(result.user);
      toast.success("Logged in successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="">Find a pet</Link>
      </li>
      <li>
        <Link to="">Breeds</Link>
      </li>
      <li>
        <Link to="">Contact Us</Link>
      </li>
    </>
  );
  return (
    <div className="bg-light-secondary z-[999] relative">
      {/* top menu start  */}
      <nav className="md:container mx-auto flex items-center justify-between py-5 md:px-0 px-4 border-b-2 border-black md:border-b-0 mb-24">
        {/* logo  */}
        <div className="flex items-center gap-3">
          <img className="block" src={logo} alt="" />
          <h2 className="font-secondary text-light-text text-xl lg:text-[26px]">
            Browse<span className="text-light-accent"> 4 </span>Pets
          </h2>
        </div>
        {/* mobile logo  */}

        {/* center nav menu  */}
        <div className="hidden md:block">
          <ul className="font-secondary  flex items-center justify-center gap-6 text-title text-xl">
            {links}
          </ul>
        </div>
        {/* icon and button  */}

        <div className="">
          {
            user ? <div className="space-x-4 hidden lg:flex  items-center">
              <img src={user?.photoURL} alt="" className="w-10 lg:w-14 lg:h-14 h-10 rounded-full" />
              <button  onClick={handleLogout} className="border-none bg-light-accent py-[10px] px-[30px] rounded-lg text-light-text font-secondary text-xl ml-3 cursor-pointer">Logout</button>
            </div> : <div className="space-x-4 hidden md:block">
            {/* button  */}
            <Link to="/auth/login" className="cursor-pointer">
              <button className="border font-secondary  border-light-accent py-[10px] px-[30px] rounded-lg text-xl cursor-pointer">
                Login
              </button>
            </Link>
  
            <Link to="/auth/register" className="cursor-pointer">
              <button className="border-none bg-light-accent py-[10px] px-[30px] rounded-lg text-light-text font-secondary text-xl ml-3 cursor-pointer">
                Register
              </button>
            </Link>
          </div>
          }
        </div>


        














































        {/* mobile menu */}
        <span className="md:hidden">
          {/* MOBILE DRAWER STARTS */}
          <div className="flex items-center justify-between drawer drawer-end lg:hidden z-[9999]  ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                <GiHamburgerMenu size={30} className="mx-3" />
              </label>
            </div>
            <div className="drawer-side  ">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="flex flex-col justify-between min-h-full w-80 bg-base-200 max-w-[300px] p-4">
                <div>
                  <ul className="font-secondary menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {links}
                  </ul>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </span>
      </nav>
    </div>
  );
};

export default NavBar;
