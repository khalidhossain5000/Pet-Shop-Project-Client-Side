import { useQuery } from "@tanstack/react-query";

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

import { useState } from "react";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
import Loading from "../../../Shared/Loading/Loading.jsx";
import useAuth from "../../../../Hooks/useAuth.jsx";
import ItemModal from "../../AdminDashBoard/ItemDetailsModalComponent/ItemModal.jsx";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const {
    data: MyOrders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-MyOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `payments/specific/order?email=${user?.email}`
      );
      return res.data || [];
    },
  });

  console.log("this is data ", MyOrders);

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
    <div className="container mx-auto pt-6 lg:pt-12">
      <h1 className="text-light-text mb-6 text-xl lg:text-3xl font-primary ">
        My Orders
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
            </TableRow>
          </TableHead>
          <TableBody>
            {MyOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#FFF9F4] p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-extrabold mb-4 text-[#111111] animate-pulse">
                      No Orders Found
                    </h2>
                    <p className="text-gray-600 mb-6 text-center max-w-md leading-relaxed">
                      You haven't placed any orders yet. Start shopping and find
                      your favorite pets!
                    </p>
                    <button className="bg-[#FFDC26] text-[#111111] font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-[#e6c222] hover:scale-105 transform transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {MyOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.orderDate}</TableCell>

                <TableCell>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-sm xl:text-xl px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8C42] text-light-text xl:font-bold rounded-sm shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    View Items
                  </button>
                  <ItemModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    order={order}
                  />
                </TableCell>
                <TableCell>{order.paymentMethod.join(", ")}</TableCell>

                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.orderStatus === "Received"
                        ? "bg-gray-200 text-gray-800"
                        : order.orderStatus === "Processing"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-200 text-blue-800"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
