import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { useCart } from "../../../Hooks/useCart";
import Drawer from "@mui/material/Drawer";
import { RxCross2 } from "react-icons/rx";

const FinalPetDetails = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const { isDrawerOpen, toggleDrawer } =
    useCart();

  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/pets");
      return response.data;
    },
  });
  if (isLoading) return <Loading />;
  const singlePetData = pets.find((pet) => pet._id === id);
  
  return (
    <div className="py-12 lg:pt-22">
      <div className="max-w-4xl mx-auto  bg-light-secondary rounded-2xl shadow-lg p-8 font-secondary">
        {/* Image + Basic Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Pet Image */}
          <div className="w-full md:w-1/2">
            <img
              src={singlePetData.petPic}
              alt={singlePetData.petName}
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-primary font-bold text-light-text mb-2">
                {singlePetData.petName}
              </h1>
              <p className="text-lg text-gray-600 capitalize">
                {singlePetData.petCategory} • {singlePetData.breed}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <p className="text-sm">
                <span className="font-bold">Age:</span> {singlePetData.age}{" "}
                years
              </p>
              <p className="text-sm">
                <span className="font-bold">Gender:</span>{" "}
                {singlePetData.gender}
              </p>
              <p className="text-sm">
                <span className="font-bold">Size:</span>{" "}
                {singlePetData?.size ? singlePetData?.size : "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-bold">Color:</span> {singlePetData.color}
              </p>
              <p className="text-sm">
                <span className="font-bold">Health:</span>{" "}
                {singlePetData.healthStatus}
              </p>
              <p className="text-sm">
                <span className="font-bold">Location:</span>{" "}
                {singlePetData.location}
              </p>
            </div>

            <div className="mt-6 ">
              <p className="text-2xl font-bold text-light-text">
                ${singlePetData.price}
              </p>
              <div className="mt-6 flex gap-4">
                <button
                  
                  className="px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300 bg-[var(--color-light-accent)] text-[var(--color-light-text)] hover:bg-yellow-400 hover:scale-105 cursor-pointer"
                >
                  Add to Cart
                </button>
                <button className="px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300 bg-[var(--color-light-text)] text-[var(--color-light-primary)] hover:bg-gray-900 hover:scale-105">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[var(--color-light-text)] mb-2">
            About {singlePetData.petName}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {singlePetData.description}
          </p>
        </div>

        {/* Status */}
        <div className="mt-6 flex justify-end">
          <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
            {singlePetData.status}
          </span>
        </div>
      </div>
      <Drawer
        anchor="right" // ডান দিক থেকে slide হবে
        open={isDrawerOpen} // context থেকে state
        onClose={() => toggleDrawer(false)} // বন্ধ করার জন্য
      >
        
      </Drawer>
    </div>
  );
};

export default FinalPetDetails;
