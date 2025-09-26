import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const CartSidebar = ({ open, onClose, cartItems }) => {
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
          {cartItems?.cartItemInfo?.map((item,i) => (
            <ListItem key={i} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => alert("Checkout clicked")}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
