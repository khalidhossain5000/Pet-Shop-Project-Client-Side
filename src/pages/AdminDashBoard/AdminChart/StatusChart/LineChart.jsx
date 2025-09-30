import React from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";

const LineChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["order-status-line"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/orders/status-ratio");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Transform data for Google LineChart
  const chartData = [
    ["Status", "Count"], // header row
    ...data.map(item => [item.status, item.count])
  ];

  const options = {
    title: "Order Status Count",
    hAxis: { title: "Status" },      // x-axis
    vAxis: { title: "Count", minValue: 0 }, // y-axis
    curveType: "function",           // smooth line
    colors: ["#4285F4"]
  };

  return (
    <div>
      
      <Chart
        chartType="LineChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
};

export default LineChart;
