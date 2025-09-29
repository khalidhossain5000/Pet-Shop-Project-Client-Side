import React, { useState } from "react";
import { Outlet } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";

import ProfileSidebar from "./ProfileSidebar";
import useAuth from "../../../Hooks/useAuth";

const ProfileDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen bg-light-secondary">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* profile Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        
        <ProfileSidebar onClose={handleDrawerToggle}/>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-6 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDrawerToggle}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <FiMenu className="w-6 h-6 text-light-text" />
              </button>
              <h1 className="text-xl font-bold text-light-text font-secondary">
                User Profile Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center justify-center">
                  <img
                    src={user?.photoURL}
                    alt="Admin-photo"
                    className="w-8 h-8 rounded-full "
                  />
                </div>
                <span className="text-sm font-primary font-medium text-light-text">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard;
