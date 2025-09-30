import React from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
const PieChart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["weekly-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/day-wise-count?email=${user.email}`
      );
      return res.data;
    },
  });

  const dayMap = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
  };

  // transform data for PieChart
  const chartData = [
    ["Day", "Orders"], // header row
    ...data.map((item) => [dayMap[item._id] || "Unknown", item.totalOrders]),
  ];

  console.log(chartData);

  const totalOrders = chartData.slice(1).reduce((sum, d) => sum + d[1], 0); // d[1] = orders

  if (isLoading) return <p>Loading...</p>;
  const options = {
    title: "My Daily Activities",
  };
  return (
    <div>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"300px"}
      />

      {/* Center label for total orders */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-[140px] -translate-y-[20px] text-center">
        <p className="text-lg font-semibold text-gray-700">Total Orders</p>
        <p className="text-2xl font-bold text-indigo-600">{totalOrders}</p>
      </div>
    </div>
  );
};

export default PieChart;
