import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "@mui/x-charts/PieChart";
import BarChart from "./AdminChart/BarChart";

const DashBoard = () => {
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
  const chartData = data.map((item, idx) => ({
    id: idx,
    value: item.totalOrders,
    label: dayMap[item._id] || "Unknown",
  }));
  console.log(data, chartData);

  const totalOrders = chartData.reduce((sum, d) => sum + d.value, 0);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-5xl font-bold text-red-600">Dashboard Home</h2>
      {/* order week pie chart starts here */}
      <div>
        <h2 className="text-xl font-bold mb-4">Weekly Orders</h2>
        <PieChart
          series={[
            {
              data: chartData,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
              innerRadius: 60, // donut style
              outerRadius: 120,
              paddingAngle: 3,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              animation: { duration: 1000 }, // animation
            },
          ]}
          width={400}
          height={400}
          slotProps={{
            legend: {
              position: { vertical: "middle", horizontal: "right" },
              labelStyle: { fontSize: 14 },
            },
          }}
        />

        {/* Center label for total orders */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-[140px] -translate-y-[20px] text-center">
          <p className="text-lg font-semibold text-gray-700">Total Orders</p>
          <p className="text-2xl font-bold text-indigo-600">{totalOrders}</p>
        </div>
      </div>
      {/* order week pie chart ends here */}
      {/* BAR CHART */}
      <div>
        <BarChart />
      </div>
    </div>
  );
};

export default DashBoard;
