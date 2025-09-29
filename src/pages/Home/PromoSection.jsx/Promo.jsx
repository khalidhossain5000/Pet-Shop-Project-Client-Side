import React from "react";
import bgImg from "../../../assets/Bgimg/bg-img.png";
import image from "../../../assets/Bgimg/banner-img.png";
import { Link } from "react-router";
import { FaBasketShopping } from "react-icons/fa6";
const Promo = () => {
  return (
    <div
      className="bg-cover bg-center bg-[#fff9f4] bg-no-repeat py-36"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1 ">
          <h3 className="text-center lg:text-left text-xl font-secondary text-orange-400 font-bold uppercase mb-6">
            Fast Delivery
          </h3>
          <h1 className="text-center lg:text-left  text-2xl lg:text-4xl xl:text-6xl font-primary font-bold text-[#19063c] mb-6 leading-tight">
            Find Everything <br /> You Need For <br /> Pets
          </h1>
          <p className="text-center md:text-left text-xl font-secondary md:mt-4 md:mb-8 my-3 max-w-2xl text-gray-700 ">
            If you’re getting a new dog, you’re going to need things like a
            leash, collar, and crate, so we’ve put together a list of supplies
            for new.
          </p>
          <div className="text-center flex justify-center lg:block">
          <Link to="/all-pets" className="cursor-pointer">
            <button className="border-none bg-light-accent py-[10px] px-[30px] rounded-lg text-light-text font-secondary text-xl ml-3 cursor-pointer flex items-center gap-3 ">
              Shop Now <FaBasketShopping className="text-2xl text-light-text" />
            </button>
          </Link>
          </div>
        </div>
        <div className="imgs flex-2 ">
          <img src={image} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Promo;
