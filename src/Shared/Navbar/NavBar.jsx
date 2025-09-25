import React from "react";
import logo from "../../assets/logo/logo-header.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../../Hooks/useRole";
import Loading from "../Loading/Loading";
import { FaCartShopping } from "react-icons/fa6";


const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const { role, isLoading } = useRole();


  if (isLoading) return <Loading />;

  const handleLogout = () => {
    logoutUser()
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-pets">All pets</Link>
      </li>
      <li>
        <Link to="">Find a pet</Link>
      </li>
      <li>
        <Link to="/all-products">All Products</Link>
      </li>
      <li>
        <Link to="/add-a-pet">Add a pet</Link>
      </li>
      <li>
        <Link to="/breeds">Breeds</Link>
      </li>
      <li>
        <Link to="">Contact Us</Link>
      </li>
      {role === "admin" && (
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
      )}
    </>
  );
  
  return (
    <div className="bg-light-secondary z-[999] relative">
      {/* top menu start  */}
      <nav className="md:container mx-auto flex items-center justify-between py-5 md:px-0 px-6 border-b-1 border-black/30 md:border-b-0 lg:px-2 xl:px-0">
        {/* logo  */}
        <div className="flex items-center gap-3">
          <img className="block " src={logo} alt="sdgg" />
          <h2 className="font-secondary text-light-text text-sm xl:text-[26px]">
            Browse<span className="text-light-accent"> 4 </span>Pets
          </h2>
        </div>
        {/* mobile logo  */}

        {/* center nav menu  */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="font-secondary  flex items-center justify-center gap-6 text-title xl:text-[17px] lg:font-medium  font-semibold">
            {links}
          </ul>
          <div className="relative inline-block">
            {/* Cart Icon */}
            <Link to='/cart'><FaCartShopping className="text-light-text text-3xl" /></Link>

            {/* Cart Count Indicator */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
             3
            </span>
          </div>
        </div>
        {/* icon and button  */}

        <div className="">
          {user ? (
            <div className="space-x-4 hidden lg:flex  items-center">
              <img
                src={user?.photoURL}
                alt="sdgdsg"
                className="w-10 lg:w-14 lg:h-14 h-10 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="border-none bg-light-accent xl:py-[10px] xl:px-[30px] rounded-lg text-light-text font-secondary xl:text-xl py-1 px-3 ml-3 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4 hidden md:block">
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
          )}
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
                <div className="">
                  {user ? (
                    <div className="space-x-4 md:hidden flex  items-center">
                      <img
                        src={user?.photoURL}
                        alt="good-image"
                        className="w-10 lg:w-14 lg:h-14 h-10 rounded-full"
                      />
                      <button
                        onClick={handleLogout}
                        className="border-none bg-light-accent py-[10px] px-[30px] rounded-lg text-light-text font-secondary text-xl ml-3 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-x-4 md:hidden flex ">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </span>
      </nav>
    </div>
  );
};

export default NavBar;
