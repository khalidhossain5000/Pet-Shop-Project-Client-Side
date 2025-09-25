// CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";

import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemDetails) => {
    console.log(itemDetails);
  };

  const cartInfo = {
    addToCart,
    cartItems,
    setCartItems
  };
  return <CartContext value={cartInfo}>{children}</CartContext>;
};

export default CartProvider;
