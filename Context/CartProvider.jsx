// CartProvider.jsx
import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import CartSidebar from "../src/Shared/CartSidebar/CartSidebar";
import Loading from "../src/Shared/Loading/Loading";
import toast from "react-hot-toast";
const CartProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  // Initialize cart with proper structure
  const [cartItems, setCartItems] = useState({
    userEmail: user?.email || "",
    cartItemInfo: [],
  });

  // Toggle cart sidebar
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // fetch only if user exists
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const mergedItems = data.flatMap((item) => item.cartItemInfo);
      setCartItems({
        userEmail: user?.email || "",
        cartItemInfo: mergedItems,
      });
    }
  }, [data, user?.email]);

  if (isLoading) return <Loading />;

  //sub total calculation
  const subTotal = cartItems?.cartItemInfo
    ?.reduce((total, item) => total + parseFloat(item.price), 0)
    .toFixed(2);

  const subTotalRounded = parseFloat(subTotal);
  //AMOUNT IN CENTES FOR STRIPE PAYMENT
  const amountInCents = subTotalRounded * 100;
  const addToCart = (itemDetails) => {
    const { _id, petName, petCategory, breed, size, price,petPic } = itemDetails;


    // Check if item already exists in the cart
    const alreadyExists = cartItems?.cartItemInfo?.some(
      (item) => item.petId === _id
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
    const newItem = { petId: _id, petName, petCategory, breed, size, price ,petPic};

    // Update cart state while preserving existing items
    const updatedCart = {
      userEmail: user?.email,
      cartItemInfo: [...cartItems.cartItemInfo, newItem],
    };
    // State update
    setCartItems(updatedCart);
    axiosSecure.post("/carts", updatedCart).then((res) => {
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Item Added to Cart",
        text: "You have successfully added this item to your cart!",
        confirmButtonText: "OK",
      }).then(() => {
        // Open sidebar
        setOpen(true);
      });
      console.log(res);
    });
  };

  //remove cart item from state and db function start here
  const removeCart = async (petId) => {
    try {
      const res = await axiosSecure.delete(`/carts/${user?.email}/${petId}`);
      if (res.data.modifiedCount > 0) {
        // remove from ui state in the sidebar
        setCartItems((prev) => ({
          ...prev,
          cartItemInfo: prev.cartItemInfo.filter(
            (item) => item.petId !== petId
          ),
        }));

        //Success alert
        toast.success("Item removed from cart!");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const cartInfo = {
    addToCart,
    cartItems,
    setCartItems,
    isDrawerOpen,
    toggleDrawer,
    removeCart,
    subTotalRounded,
    amountInCents
  };

  return (
    <>
      <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>

      {/* CartSidebar rendered here */}
      <CartSidebar
        open={open}
        onClose={() => setOpen(false)}
        cartItems={cartItems}
        subTotal={subTotalRounded}
        removeCart={removeCart}
      />
    </>
  );
};

export default CartProvider;
