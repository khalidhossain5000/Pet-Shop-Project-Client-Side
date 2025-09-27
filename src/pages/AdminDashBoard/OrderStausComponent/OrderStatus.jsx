import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const OrderStatus = ({ orderId, currentStatus }) => {
  const queryClient = useQueryClient();
const axiosSecure=useAxiosSecure()
  const mutation = useMutation({
    mutationFn: async (newStatus) => {
      const res = await axiosSecure.patch(`/orders/${orderId}/status`, { status: newStatus });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]); //refresh orders list
    },
  });

  const statuses = ["Received", "Processing", "Shipped", "Delivered"];

  return (
    <select
      className="border rounded-md px-2 py-1 text-sm cursor-pointer"
      value={currentStatus}
      onChange={(e) => mutation.mutate(e.target.value)}
      disabled={mutation.isPending}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default OrderStatus;
