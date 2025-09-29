import React from "react";
import bannerImg from "../../../assets/Bgimg/profile-bg.jpg";
import useAuth from "../../../../Hooks/useAuth";

const ProfileHome = () => {
  const { user } = useAuth();

  return (
    <div className=" ">
      {/* my style start here  */}
      {/* banner and user email and name section  */}
      <div
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
        className="bg-cover bg-center h-64 flex items-center justify-center relative"
      >
        <div className="user-ingo text-white absolute md:bottom-10 md:left-12 bottom-5 left-6">
          <h2 className="text-2xl font-bold md:text-4xl">
            {" "}
            {user?.displayName}{" "}
          </h2>
          <p className="mt-2 text-lg md:text-xl">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
