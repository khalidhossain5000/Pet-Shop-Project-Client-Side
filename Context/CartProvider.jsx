// CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

import useAuth from "../Hooks/useAuth";

const CartProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  console.log(user, axiosSecure);
  // Cart state
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  // inside CartProvider

  const addToCart = async (petData) => {
    const cartData = {
      email: user?.email,
      item: {
        petName: petData?.petName,
        petPrice: petData?.price,
        petImage: petData?.petPic,
      },
    };

    const res = await axiosSecure.post("/cart", cartData);
    console.log("this is res", res);
    setCart(res.data);
    toast.success(`User Registered SuccessFully`, {
      className: "w-[300px] h-[100px] text-xl font-bold ",
      removeDelay: 1000,
      iconTheme: {
        primary: "#16061e",
        secondary: "#ef54e2",
      },
      style: {
        border: "1px solid #08086c",
        color: "white",
        backgroundImage: "linear-gradient(to bottom right, #050342,#01c3f4 )",
      },
    });
    setIsDrawerOpen(true);
  };

  return (
    <CartContext
      value={{
        cart,
        setCart,
        isDrawerOpen,
        toggleDrawer,
        addToCart,
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartProvider;
