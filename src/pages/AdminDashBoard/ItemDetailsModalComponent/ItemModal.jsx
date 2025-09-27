import React from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import { ImCross } from "react-icons/im";

const ItemModal = ({ open, onClose, order }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 },
          maxHeight: "80vh",
          bgcolor: "#ffdc26",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Ordered Items
          </Typography>
          <IconButton onClick={onClose} className="text-red-600">
            <ImCross className="text-red-600"/>
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Items List */}
        {order?.paymentItem?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              bgcolor: "#F5F294",
            }}
          >
            {/* Pet Image */}
            <Box sx={{ flexShrink: 0 }}>
              <img
                src={item.petPic}
                alt={item.petName}
                style={{ width: 100, height: 100, borderRadius: 12, objectFit: "cover" }}
              />
            </Box>

            {/* Pet Details */}
            <Box sx={{ flexGrow: 1 }}>
              <h2 className="text-xl lg:text-2xl font-bold text-light-text pb-3">Item Name: {item.petName}</h2>
              <Typography variant="body2" color="text.secondary">
                Category: {item.petCategory} | Breed: {item.breed} | Size: {item.size || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${item.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default ItemModal;
