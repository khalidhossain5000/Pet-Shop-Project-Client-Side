import React from "react";
import { useCart } from "../../../Hooks/useCart";
import { FaTrash, FaShoppingCart, FaPaw, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const CartPage = () => {
  const { cartItems ,subTotalRounded,removeCart} = useCart();
  const allCartItems = cartItems.cartItemInfo;
  

  return (
    <div className="min-h-screen bg-[#FFF9F4] py-12 px-4 sm:px-6 lg:px-8">
      {/* Updated Cart Banner with Radial Gradient and Animation */}
      <div className="relative bg-[#FFFFFF] mb-10 rounded-xl shadow-xl py-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFDC26_0%,#FFF9F4_50%,#FFFFFF_100%)] opacity-80 animate-pulse-slow"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-[#111111] tracking-tight">
            Your Cart Items
          </h1>
          <p className="text-xl text-[#111111] mt-4 max-w-2xl mx-auto">
            Ready to bring home your new furry friend? Review your selections
            below!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {allCartItems.length === 0 ? (
          <div className="bg-[#FFFFFF] p-10 rounded-xl shadow-lg text-center">
            <p className="text-[#111111] text-2xl font-medium">
              Your cart is currently empty
            </p>
            <Link
              to="/all-pets"
              className="mt-6 inline-block bg-[#FFDC26] text-[#111111] px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {allCartItems.map((item) => (
                <div
                  key={item.petId}
                  className="bg-[#FFFFFF] p-8 rounded-xl shadow-lg flex items-center space-x-8"
                >
                  <img
                    src={item.petPic}
                    alt={item.petName}
                    className="w-36 h-36 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold text-[#111111]">
                      {item.petName}
                    </h3>
                    <p className="text-lg text-[#111111] capitalize mt-2">
                      Category: {item.petCategory}
                    </p>
                    <p className="text-lg text-[#111111] capitalize">
                      Breed: {item.breed}
                    </p>
                    <p className="text-lg text-[#111111] capitalize">
                      Size: {item.size}
                    </p>
                    <p className="text-xl font-semibold text-[#111111] mt-3">
                      ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCart(item.petId)}
                    className="text-[#111111] hover:text-[red] transition cursor-pointer"
                    title="Remove Item"
                  >
                    <FaTrash size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-semibold text-[#111111] mb-8">
                Order Summary
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between text-lg text-[#111111]">
                  <span>Subtotal</span>
                  <span>${subTotalRounded}</span>
                </div>
                <div className="flex justify-between text-lg text-[#111111]">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-[#111111] border-t pt-6">
                  <span>Total</span>
                  <span>${subTotalRounded}</span>
                </div>
              </div>
              <Link to='/payment' >
                <button className="w-full mt-8 bg-[#FFDC26] text-[#111111] py-4 rounded-md font-semibold text-lg hover:bg-opacity-90 transition cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>
              <Link
                to="/all-pets"
                className="block text-center mt-6 text-lg text-[#111111] hover:text-black transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
