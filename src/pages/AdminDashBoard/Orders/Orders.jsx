import { useReactToPrint } from "react-to-print";

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
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Loading from "../../../Shared/Loading/Loading.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
import OrderStatus from "../OrderStausComponent/OrderStatus.jsx";
import ItemModal from "../ItemDetailsModalComponent/ItemModal.jsx";
import { useRef, useState } from "react";

import Invoice from "./Invoice.jsx";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  //   const queryClient = useQueryClient();
  
  const [openModal, setOpenModal] = useState(false);

const invoiceRef = useRef();


    const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-$1`, // PDF এর নাম
  });

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

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  ></Box>
                </TableCell>
                <TableCell>
                  <OrderStatus
                    currentStatus={order.orderStatus}
                    orderId={order._id}
                  ></OrderStatus>

                  {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Print / Download Invoice
      </button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Printable Area */}
      <div ref={invoiceRef}>
        <Invoice order={orders} />
      </div>
    </div>
  );
};

export default Orders;
