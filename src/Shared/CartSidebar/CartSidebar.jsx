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

const CartSidebar = ({ open, onClose, cartItems, subTotal }) => {
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

        {/* Checkout Button at bottom */}
        <Box sx={{ mt: "auto" }}>
          <h2 className="text-center  mb-6  text-light-text text-3xl font-primary ">
            Subtotal : ${subTotal}
          </h2>
          <button
            className="border-none bg-light-accent xl:py-[10px] xl:px-[30px] rounded-lg text-light-text font-secondary xl:text-xl py-1 px-3  cursor-pointer w-full"
            onClick={() => alert("Checkout clicked")}
          >
            Checkout
          </button>

          <button
            className="mt-6 border-none bg-light-text xl:py-[10px] xl:px-[30px] rounded-lg text-light-secondary font-secondary xl:text-xl py-1 px-3  cursor-pointer w-full"
            onClick={() => alert("Checkout clicked")}
          >
            View Cart
          </button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
