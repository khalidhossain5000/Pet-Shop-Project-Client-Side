import React from "react";
import bannerImg from "../../../assets/Bgimg/profile-bg.jpg";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import { IoIosTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { Link } from "react-router";
import { FaDiagramSuccessor } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

const ProfileHome = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { data = 0, isLoading } = useQuery({
    queryKey: ["total-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/order-stats?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  console.log(data, "This is total order ");
  return (
    <div className=" relative">
      {/* my style start here  */}
      {/* banner and user email and name section  */}
      <div
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
        className="bg-cover bg-center h-64 flex items-center justify-center relative shadow-2xl"
      >
        <div className="user-ingo text-white absolute md:bottom-10 md:left-12 top-24 left-6">
          <h2 className="text-2xl font-bold md:text-4xl">
            {" "}
            {user?.displayName}{" "}
          </h2>
          <p className="mt-2 text-lg md:text-xl">{user?.email}</p>
          <p className="mt-2 text-sm md:text-lg">Role: {role}</p>
        </div>
      </div>
      {/* user profile image  */}
      {/* Profile Content */}
      <div className="container mx-auto px-4 -mt-16 sm:-mt-20">
        {/* Profile Image */}
        <div className="flex justify-center relative z-50 ">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-gray-50/90"
          />
        </div>
      </div>

      {/* profle more details will be add later */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 items-stretch px-3 xl:px-0">
        {/* TOTAL ORDERS CARD*/}
        <div className="relative w-full max-w-xs sm:max-w-lg  rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-2xl h-full">
          {/* --- Background Trend Graphic --- */}
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <IoIosTrendingUp className="w-40 h-40 text-white rotate-12" />
          </div>
          {/* --- Card Content Layout --- */}
          <div className="relative flex flex-col  justify-between h-full">
            {/* TOP SECTION: Title and Icon Badge */}
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium  lg:font-bold tracking-wide">
                  Total Orders
                </h2>
                {/* User Icon Badge  */}
                <div className="p-3 rounded-full bg-green-700/50 backdrop-blur-sm shadow-inner">
                  <IoCartOutline className="w-5 h-5" />
                </div>
              </div>

              {/* MIDDLE SECTION: Large Metric Number */}
              <div className="flex-1 flex items-center pt-2">
                <p className="text-2xl md:text-3xl lg:text-6xl font-bold lg:font-extrabold ">
                  {data?.totalOrders || 0}
                </p>
              </div>
              {/* BOTTOM SECTION: Percentage Change and Menu Icon */}
              <div className="flex flex-col  justify-end mt-2 space-y-2 lg:space-y-3">
                {/* Percentage Change Pill and Label */}

                <span className="text-sm font-light opacity-90">All Time</span>

                {/* Menu Icon (Vertical Dots) */}
                <Link to={"/all-pets"}>
                  <button className="px-3 py-1 lg:py-2 cursor-pointer rounded-full text-white/90 hover:bg-green-700 transition flex items-center bg-light-accent/60">
                    Shop More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER COMPLETED CARD */}
        <div className="relative w-full max-w-xs sm:max-w-lg  rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-2xl h-full">
          {/* --- Background Trend Graphic --- */}
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <IoMdTrendingDown className="w-40 h-40 text-white rotate-12" />
          </div>
          {/* --- Card Content Layout --- */}
          <div className="relative flex flex-col  justify-between h-full">
            {/* TOP SECTION: Title and Icon Badge */}
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium  lg:font-bold tracking-wide">
                  Total Delivered Orders
                </h2>
                {/* User Icon Badge  */}
                <div className="p-3 rounded-full bg-green-700/50 backdrop-blur-sm shadow-inner">
                  <FaDiagramSuccessor className="w-5 h-5" />
                </div>
              </div>

              {/* MIDDLE SECTION: Large Metric Number */}
              <div className="flex-1 flex items-center pt-2">
                <p className="text-2xl md:text-3xl lg:text-6xl font-bold lg:font-extrabold ">
                  {data?.deliveredOrders || 0}
                </p>
              </div>
              {/* BOTTOM SECTION: Percentage Change and Menu Icon */}
              <div className="flex flex-col  justify-end mt-2 space-y-2 lg:space-y-3">
                {/* Percentage Change Pill and Label */}

                <span className="text-sm font-light opacity-90">All Time</span>

                {/* Menu Icon (Vertical Dots) */}
                <Link to={"/all-pets"}>
                  <button className="px-3 py-1 lg:py-2 cursor-pointer rounded-full text-white/90 hover:bg-green-700 transition flex items-center bg-light-accent/60">
                    Shop More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* EDIT PROFILE CARD */}
        <div className="relative w-full max-w-xs sm:max-w-lg rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl h-full">
          {/* --- Background Graphic --- */}
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <FaUserEdit className="w-40 h-40 text-white rotate-12" />
          </div>

          {/* --- Card Content Layout --- */}
          <div className="relative flex flex-col justify-between h-full">
            {/* TOP SECTION: Title and Icon Badge */}
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-bold tracking-wide">
                  Update Profile
                </h2>
                {/* Icon Badge */}
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <FaUserEdit className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* MIDDLE SECTION: Info */}
              <div className="flex-1 flex items-center pt-2">
                <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-90">
                  Keep your account info up to date
                </p>
              </div>

              {/* BOTTOM SECTION: Button */}
              <div className="flex flex-col justify-end mt-2 space-y-2 lg:space-y-5">
                <span className="text-sm font-light opacity-90">
                  Manage Settings
                </span>
                <Link to="/profile/update">
                  <button className="px-4 py-2 cursor-pointer rounded-full text-white font-medium bg-blue-700/70 hover:bg-blue-800 transition flex items-center gap-2 shadow-md">
                    <FaUserEdit className="w-4 h-4" />
                    Update Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default ProfileHome;
