import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../../Hooks/useAxios";

const ProfileUpdate = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  // State for input values
  const [name, setName] = useState(user?.displayName || "");
  const [profilePic, setProfilePic] = useState(user?.photoURL || "");
  const [previewUrl, setPreviewUrl] = useState(user?.photoURL || null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      return toast.loading("Please wait, image uploading...");
    }

    const updatedProfile = {
      displayName: name,
      photoURL: profilePic,
    };

    try {
      // 1 Firebase update
      await updateUserProfile(updatedProfile);

      // 2 Local state update
      setUser({ ...user, displayName: name, photoURL: profilePic });

      // 3 DB update
      await axiosInstance.patch(`/users/${user?.email}`, {
        name,
        profilePic,
      });

      toast.success("Profile updated successfully!", {
        className: "w-[300px] h-[100px] text-xl font-bold",
      });
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview update
    setPreviewUrl(URL.createObjectURL(file));

    // formdata prepare
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb_Key}`,
        formData
      );
      
      
      setProfilePic(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    }
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleFormSubmit}
        className="bg-light-primary w-full max-w-md rounded-xl shadow-lg border p-6 font-secondary"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <h2 className="mb-4 text-2xl font-semibold font-primary text-light-text lg:font-bold">
          Update Your Profile
        </h2>

        <div className="flex flex-col gap-3">
          {/* Name Input */}
          <label className="text-sm text-light-text">
            <span className="mb-1 inline-block">User Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Update your name"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 bg-light-secondary"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
              required
            />
          </label>

          {/* Profile Picture */}
          <label className="text-sm text-light-text">
            <span className="mb-1 inline-block">Profile Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full py-2"
            />
          </label>

          {previewUrl && (
            <div
              className="w-full rounded-lg border p-2 flex items-center gap-3"
              style={{
                background: "var(--color-light-secondary)",
                borderColor: "rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="text-xs opacity-80">Preview of your image</span>
            </div>
          )}

          {/* Email Input (disabled) */}
          <label className="text-sm text-light-text">
            <span className="mb-1 inline-block">Email</span>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 bg-light-secondary opacity-70 cursor-not-allowed"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 px-4 py-3 rounded-lg font-bold hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--color-light-accent)",
              color: "var(--color-light-text)",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
