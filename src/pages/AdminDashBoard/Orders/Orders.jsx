import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Loading from "../../../Shared/Loading/Loading.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
import OrderStatus from "../OrderStausComponent/OrderStatus.jsx";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  console.log(queryClient);

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/orders");
      return res.data || [];
    },
  });

  

  //delete user starts
  //   const { mutateAsync: deleteUserAsync, isPending: isDeleting } = useMutation({
  //     mutationFn: async (userId) => {
  //       await axiosSecure.delete(`/admin/users/${userId}`);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["admin-users"] });
  //     },
  //   });
  //delete user ends

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          {error?.message || "Failed to load users."}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <h1 className="text-light-text mb-6 text-xl lg:text-3xl font-primary ">
        All Users
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.orderDate}</TableCell>

                <TableCell>
                  {order.paymentItem.map((item, index) => (
                    <div key={index}>
                      {item.petName} ({item.petCategory}) - {item.breed} : $
                      {item.price}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.paymentMethod.join(", ")}</TableCell>

                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    
                  </Box>
                </TableCell>
                 <TableCell>
                    <OrderStatus 
                    currentStatus={order.orderStatus}
                    orderId={order._id}
                    ></OrderStatus>
                    
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
