// CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";

import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import toast from "react-hot-toast";

const CartProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Initialize cart with proper structure
  const [cartItems, setCartItems] = useState({
    userEmail: user?.email || "",
    cartItemInfo: [],
  });

  console.log(axiosSecure);
  const addToCart = (itemDetails) => {
    const { _id, petName, petCategory, breed, size, price } = itemDetails;

    // Check if item already exists in the cart
    const alreadyExists = cartItems?.cartItemInfo?.some(
      (item) => item._id === _id
    );

    if (alreadyExists) {
      // Show warning if item already exists
      return Swal.fire({
        icon: "warning",
        title: "Item Already Exists",
        text: "You have already added this item to the cart!",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });
    }

    // If item doesn't exist, add it to cart
    const newItem = { _id, petName, petCategory, breed, size, price };

    // Update cart state while preserving existing items
    setCartItems((prevCart) => ({
      userEmail: user?.email || "",
      cartItemInfo: [...prevCart.cartItemInfo, newItem],
    }));
    axiosSecure.post('/carts',cartItems)
    .then((res)=>{
      alert("Sended cart tot eh db sucess")
      console.log(res)
    })
    // Show success message
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart",
      text: "You have successfully added this item to your cart!",
      confirmButtonText: "OK",
    });
  };

  // Toggle cart sidebar
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  console.log("Current cart state:", cartItems);

  const cartInfo = {
    addToCart,
    cartItems,
    setCartItems,
    isDrawerOpen,
    toggleDrawer,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
