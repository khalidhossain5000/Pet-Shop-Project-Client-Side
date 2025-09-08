import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { useCart } from "../../../Hooks/useCart";
import Drawer from "@mui/material/Drawer";
import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
const FinalPetDetails = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const { isDrawerOpen, toggleDrawer, addToCart, cart } = useCart();
  const items = cart?.items;
  //getting the subtotal value of the cart
  const subtotal = items?.reduce((total, item) => {
  return total + parseFloat(item.petPrice);
}, 0);

  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/pets");
      return response.data;
    },
  });
  if (isLoading) return <Loading />;
  const singlePetData = pets.find((pet) => pet._id === id);
console.log(singlePetData);
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
                  onClick={() => {
                    addToCart(singlePetData);
                  }}
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
        <div
          className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-light-secondary p-6 shadow-2xl transition-transform duration-300 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Cart</h2>
            <button
              onClick={() => toggleDrawer(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {items && items.length > 0 ? (
            <div className="space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-4 ">
              {items.map((item, i) => (
               
               <div key={i}>
                  <div className="flex items-center gap-4 bg-light-accent p-4 rounded-lg shadow-sm">
                    <img
                      src={item?.petImage}
                      alt={item?.petName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item?.petName}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item?.quantity}
                      </p>
                      <p className="text-base font-bold text-blue-600">
                        Price: ${parseFloat(item?.petPrice).toFixed(2)}
                      </p>
                    </div>
                    <button  className="p-2 text-red-500 hover:text-red-700 transition-colors">
                      <FaTrashAlt className="text-2xl font-bold" />
                    </button>
                  </div>
                </div>
              ))}
              </div>
              <div className="checkout-cart-bt mb-16">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-light-text">
                  SubTotal : ${subtotal.toFixed(2)}
                </h2>

                <div className="space-y-3 w-full">
                  {/* Add to Cart button */}
                  <button className="w-full bg-[#fff9f452] hover:bg-[#FFDC26] text-[#111111] font-semibold py-3 rounded-lg transition duration-300 shadow-md cursor-pointer">
                    Add To Cart
                  </button>

                  {/* Checkout button */}
                  <button className="w-full bg-light-accent  text-light-text font-semibold py-3 rounded-lg transition duration-300 shadow-md cursor-pointer">
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">
              Your cart is empty.
            </p>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default FinalPetDetails;
