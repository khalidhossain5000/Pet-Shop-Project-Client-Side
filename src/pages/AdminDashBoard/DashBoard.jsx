import React from "react";
import PieChart from "./AdminChart/WeekOrdersChart/PieChart";
import BarChart from "./AdminChart/CategoryCountChart/BarChart";


const DashBoard = () => {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
      {/* order week pie chart starts here */}
      <div>
        <PieChart/>
      </div>
      {/* order week pie chart ends here */}
     <div>
      <BarChart/>
     </div>
    
    </div>
  );
};

export default DashBoard;
