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
  
  const addToCart=async(petData)=>{
    
    const cartData={
      email:user?.email,
      item:{
        petName:petData?.petName,
        petPrice:petData?.price,
        petImage:petData?.petPic
      }
    }

    const res=await axiosSecure.post('/cart',cartData)
    console.log("this is res",res)
    setCart(res.data)
    alert("Item Added To cart successfully")
     setIsDrawerOpen(true);
  }


  return (
    <CartContext
      value={{
        cart,
        setCart,
        isDrawerOpen,
        toggleDrawer,
        addToCart
        
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartProvider;
