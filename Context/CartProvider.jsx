// CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";

import useAxiosSecure from "../Hooks/useAxiosSecure";


import useAuth from "../Hooks/useAuth";

const CartProvider = ({ children }) => {
  const axiosSecure=useAxiosSecure()
  const {user}=useAuth()
  
  console.log(user,axiosSecure);
  // Cart state
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  // inside CartProvider
  



  return (
    <CartContext
      value={{
        cart,
        setCart,
        
        isDrawerOpen,
        toggleDrawer,
        
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartProvider;
