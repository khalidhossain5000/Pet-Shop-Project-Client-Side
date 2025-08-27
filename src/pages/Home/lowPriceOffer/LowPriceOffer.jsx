import React from "react";
import bigDog from "../../../assets/image/cute-dog-mid.png";
import midDog from "../../../assets/image/cute-pet-mid.png";
const LowPriceOffer = () => {
  return (
    <div>
      <section className="md:container mx-auto my-24 px-4 md:px-0">
        {/* title  */}
        <div className="mb-16">
          <h1 className="font-bold text-4xl font-primary text-light-text text-left mb-12">
            Everyday low Price
          </h1>
        </div>

        {/* card container  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-0 overflow-hidden">
          {/* big card -1  */}
          <div className="bg-gradient-to-r from-[#F8CCFB] to-[#ACD2FD] md:flex items-center justify-end md:justify-center rounded-xl md:col-span-2 w-full md:w-[95%]">
            {/* big card-1 text and title  */}
            <div className=" ml-9 md:static md:mr-14 md:space-y-3">
              <span className="title-color sora-font text-xl hidden md:block font-semibold font-secondary">
                Under Price
              </span>
              <h1 className="text-3xl mt-9 md:mt-0 font-primary text-light-text font-bold">Pet Grooming Mitt</h1>
              <span className="hidden md:block text-2xl text-light-text">
                (Easy Hair Removal)
              </span>
              <h1 className="text-white md:text-black font-secondary font-bold text-6xl mt-4">$7.99</h1>
            </div>
            {/* big card-1 image  */}
            <div className="flex justify-end md:justify-start md:w-5/12">
              <img className="w-9/12 md:w-full" src={bigDog} alt="" />
            </div>
          </div>
          {/* small card -2  */}
          <div className="bg-gradient-to-r from-[#FFF9F4] to-[#F9DF8A] md:flex items-end justify-end rounded-xl relative w-full">
            {/* text content  */}
            <div className="md:absolute top-20 right-48">
              {/* for mobile responsive  */}
              <div className="relative top-16 md:top-0 md:left-0 left-6">
                <h1 className="font-primary font-bold text-[32px] text-black">T-Shirt for Dogs</h1>
                <h1 className="text-[56px] text-[#ffdc26] font-bold font-secondary">$7.99</h1>
              </div>
            </div>
            {/* card-2 image  */}
            <div className="flex justify-end md:block">
              <img className="w-7/12 md:w-11/12" src={midDog} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LowPriceOffer;
