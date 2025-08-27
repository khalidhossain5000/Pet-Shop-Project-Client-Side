import React from "react";
import image from "../../../assets/Banner/cat-big.png"
const Banner = () => {
  return (
    <div>
      <section className="pt-5 md:pt-0 md:relative md:container mx-auto md:flex items-center justify-between">
        {/* banner content-text  */}
        <div className="md:absolute top-32 w-full md:w-5/12 px-4 md:px-0">
          <h1 className="mt-12 md:mt-0 text-light-text text-3xl lg:text-5xl xl:text-[56px] animate-bounce font-primary font-bold">
            Pamper Your Pet, Because They Deserve the Best
          </h1>
          <p className="text-xl font-secondary md:mt-4 md:mb-8 my-3">
            Discover a world of treats, toys, and essentials handpicked for your
            furry friends.Shop now and make tails wag with joy!
          </p>
          <button className="btn bg-[#ffdc26] font-secondary py-3 px-8 border-none text-xl hover:bg-[#ffdc26] rounded-lg cursor-pointer">
            Find a pet
          </button>
        </div>
        {/* banner image  */}
        <div className=" md:w-full lg:-mt-36">
          <img
            className="w-full md:w-full"
            src={image}
            alt="funny cat image"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
