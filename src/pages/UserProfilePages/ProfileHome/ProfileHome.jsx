import React from "react";
import bannerImg from "../../../assets/Bgimg/profile-bg.jpg";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";

const ProfileHome = () => {
  const { user } = useAuth();
  const { role } = useRole();
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
    </div>
  );
};

export default ProfileHome;
