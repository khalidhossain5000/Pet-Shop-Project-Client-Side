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



  const totalOrders = chartData.slice(1).reduce((sum, d) => sum + d[1], 0); // d[1] = orders

  if (isLoading) return <p>Loading...</p>;
  const options = {
    title:`Per Day Order Count (Total: ${totalOrders})`,
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

     
    </div>
  );
};

export default PieChart;
