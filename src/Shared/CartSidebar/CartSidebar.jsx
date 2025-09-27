import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ImCross } from "react-icons/im";


const CartSidebar = ({ open, onClose, cartItems, subTotal, removeCart,navigate }) => {

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        <Divider />

        {/* Cart Items List */}
        <List sx={{ flexGrow: 1 }}>
          {cartItems?.cartItemInfo?.map((item, i) => (
            <ListItem
              key={i}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <div className="text-red-600 absolute top-0 right-0">
                <button
                  onClick={() => removeCart(item.petId)}
                  className="cursor-pointer"
                >
                  <ImCross />
                </button>
              </div>
              <ListItemText
                primary={item.petName}
                secondary={`Category: ${item.petCategory} | Breed: ${item.breed} | Size: ${item.size}`}
              />
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                ${item.price}
              </Typography>
              <Divider sx={{ width: "100%", mt: 1, mb: 1 }} />
            </ListItem>
          ))}
        </List>
        <div></div>
        {/* Checkout Button at bottom */}
        <Box sx={{ mt: "auto" }}>
          <h2 className="text-center  mb-6  text-light-text text-3xl font-primary ">
            Subtotal : ${subTotal}
          </h2>

          <button
            onClick={() => navigate("/payment")}
            className="border-none bg-light-accent xl:py-[10px] xl:px-[30px] rounded-lg text-light-text font-secondary xl:text-xl py-1 px-3  cursor-pointer w-full"
          >
            Checkout
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="mt-6 border-none bg-light-text xl:py-[10px] xl:px-[30px] rounded-lg text-light-secondary font-secondary xl:text-xl py-1 px-3  cursor-pointer w-full"
          >
            View Cart
          </button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
