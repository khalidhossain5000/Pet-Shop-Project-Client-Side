import React from "react";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import modules navigation/pagination
// Import modules correctly
import { Navigation } from "swiper/modules";

const NewArrivalCarousel = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newArrivals = [], isLoading } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/new-arrivals");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  console.log(newArrivals);
  return (
    <div className="bg-[#f2eaea] py-12 lg:py-24 mt-6">
      <div className="container mx-auto py-6 relative">
        <h1 className="text-center md:text-left mt-3 md:mt-0 text-light-text text-3xl lg:text-4xl font-primary ">
          Explore New Arrivals Pet
        </h1>
        {/* carousel start */}
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={20} // space between slides
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 }, // mobile
            768: { slidesPerView: 2 }, // tablet
            1280: { slidesPerView: 4 }, // xl devices
          }}
        >
          {newArrivals.map((pet) => (
            <SwiperSlide key={pet._id}>
              <div className="p-4 border rounded-md shadow-md">
                <img
                  src={pet.petPic}
                  alt={pet.petName}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-2 font-semibold">{pet.petName}</h3>
                <p className="text-sm text-gray-500">{pet.breed}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom navigation buttons */}
        <div className="custom-swiper-button-prev absolute top-1/2 xl:-left-22 transform -translate-y-1/2 bg-white rounded-full text-black hover:bg-[#ffdc26] cursor-pointer transition duration-300 hover:text-white">
          <MdOutlineKeyboardDoubleArrowLeft className="text-5xl"/>
        </div>
        <div className="custom-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full text-black hover:bg-[#ffdc26] cursor-pointer transition duration-300 hover:text-white xl:-right-22">
          <MdKeyboardDoubleArrowRight className="text-5xl"/>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCarousel;
