import React from "react";
import PieChart from "./AdminChart/WeekOrdersChart/PieChart";


const DashBoard = () => {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     
      {/* order week pie chart starts here */}
      <div>
        <PieChart/>
      </div>
      {/* order week pie chart ends here */}
     
    
    </div>
  );
};

export default DashBoard;
