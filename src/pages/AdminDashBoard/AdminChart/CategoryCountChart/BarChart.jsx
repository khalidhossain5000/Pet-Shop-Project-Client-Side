import React from "react";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Shared/Loading/Loading";

const BarChart = () => {  // component name same
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ["category-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/category-count`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // transform data
  const chartData = [
    ["Category", "Count"], // x-axis = category, y-axis = count
    ...data.map(item => [item._id, item.count])
  ];

  const options = {
    title: "Pets Count by Category",
    chartArea: { width: '70%', height: '70%' },
    hAxis: { title: "Category" },
    vAxis: { title: "Count", minValue: 0 },
    colors: ["#4285F4"]
  };

  return (
    <div>
      
      <Chart
        chartType="ColumnChart"  // changed from BarChart to ColumnChart
        data={chartData}
        options={options}
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
};

export default BarChart;
