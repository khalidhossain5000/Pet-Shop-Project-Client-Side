import React from "react";
import { useNavigate, useLocation } from "react-router";
import logo from "../../../assets/logo/logo-header.png"
import {
  FiHome,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
  FiX,
  FiHeart,
  FiGrid,
  FiBarChart2,
  FiStar,
} from "react-icons/fi";

const SideBar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      text: "All Users",
      icon: <FiUsers className="w-5 h-5" />,
      path: "/dashboard/users",
    },
    {
      text: "Add Products",
      icon: <FiPackage className="w-5 h-5" />,
      path: "/dashboard/add-products",
    },
     {
      text: "All Products",
      icon: <FiPackage className="w-5 h-5" />,
      path: "/dashboard/all-products",
    },
    {
      text: "Orders",
      icon: <FiShoppingCart className="w-5 h-5" />,
      path: "/dashboard/orders",
    },
    {
      text: "Categories",
      icon: <FiGrid className="w-5 h-5" />,
      path: "/dashboard/categories",
    },
    { text: "Pets", icon: <FiStar className="w-5 h-5" />, path: "/dashboard/pets" },
    {
      text: "Analytics",
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: "/admin/analytics",
    },
    {
      text: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 ">
        <div className="flex items-center space-x-3">
          <div className="flex gap-3 items-center">
            <img src={logo} alt="" />
            <h2 className="font-secondary text-light-text text-xl ">
            Browse<span className="text-light-accent"> 4 </span>Pets
          </h2>
          </div>
          
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex cursor-pointer items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <span
                className={`
                ${isActive ? "text-white" : "text-gray-500"}
              `}
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
