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
import { Navigation ,Autoplay} from "swiper/modules";

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
      <div className="container mx-auto py-6 relative lg:px-3 xl:px-0">
        <h1 className="text-center md:text-left mt-3 md:mt-0 text-light-text text-3xl lg:text-4xl font-primary pb-12  lg:pb-16">
          Explore New Arrivals Pet
        </h1>
        {/* carousel start */}
        <Swiper
          modules={[Navigation,Autoplay]}
          autoplay={{
            delay: 3000, // seconds per slide
            disableOnInteraction: true,
          }}
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
              <div className="p-4 hover:border hover:border-[#ff782c]  rounded-md shadow-md cursor-pointer bg-amber-100 transition duration-300">
                <div className="bg-white p-6">
                  <img
                  src={pet.petPic}
                  alt={pet.petName}
                  className="w-full h-48 lg:h-64 object-cover rounded-md"
                />
                </div>
                <h3 className="pt-3 font-primary mt-2 font-semibold text-xl lg:text-2xl lg:font-bold text-light-text">Pet Name: {pet.petName}</h3>
                <p className="text-sm text-blue-600 lg:text-xl font-bold py-2 font-secondary">Price: ${pet.price}</p>
                <p className="font-secondary text-sm text-light-text">Breed: {pet.breed}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom navigation buttons */}
        <div className="z-50 custom-swiper-button-prev absolute top-1/2 xl:-left-22 transform -translate-y-1/2 bg-white rounded-full text-black hover:bg-[#ffdc26] cursor-pointer transition duration-300 hover:text-white">
          <MdOutlineKeyboardDoubleArrowLeft className="text-5xl" />
        </div>
        <div className="z-50 custom-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full text-black hover:bg-[#ffdc26] cursor-pointer transition duration-300 hover:text-white xl:-right-22">
          <MdKeyboardDoubleArrowRight className="text-5xl" />
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCarousel;
