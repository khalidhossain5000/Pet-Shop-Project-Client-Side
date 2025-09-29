import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../../Hooks/useAxios";
import { useNavigate } from "react-router";
const Register = () => {
  const [profilePic, setProfilePic] = useState("");
  //   const [passwordError, setPasswordError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  //   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const { createUser, updateUserProfile, setUser } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
const axiosInstance=useAxios()


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    if(!profilePic) {
      return toast.loading('Wait image uploading.....');
    }
    createUser(email, password).then((result) => {
      const user = result.user;
       // data sending to the db starts
       const userInfo={
        name,
        email,
        role:'user',
        profilePic
      }
      axiosInstance.post('/users',userInfo)
      // data sending to the db ends
      // update user profile in firebase
      const userProfile = {
        displayName: name,
        photoURL: profilePic,
      };

      updateUserProfile(userProfile)
        .then(() => {
          setUser({ ...user, displayName: name, photoURL: profilePic });
         
          toast.success(`User Registered SuccessFully`, {
            className: "w-[300px] h-[100px] text-xl font-bold ",
            removeDelay: 1000,
            iconTheme: {
              primary: "#16061e",
              secondary: "#ef54e2",
            },
            style: {
              border: "1px solid #08086c",
              color: "white",
              backgroundImage:
                "linear-gradient(to bottom right, #050342,#01c3f4 )",
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });

      navigate(from);
      
    });
    console.log(name, profilePic);
  };
  
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    }
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };
  console.log('profiel pic',profilePic);
  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="bg-light-primary w-full max-w-md rounded-xl shadow-lg border p-6 font-secondary"
        style={{
          borderColor: "rgba(0,0,0,0.06)",
        }}
      >
        <h2 className="mb-4 text-2xl font-semibold font-primary text-light-text lg:font-bold">
          Create your account
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-light-text">
            <span className="mb-1 inline-block">User Name</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 bg-light-secondary"
              style={{
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          </label>

          <div
            className="flex flex-col gap-2"
            style={{ color: "var(--color-light-text)" }}
          >
            <label className="text-sm">
              <span className="mb-1 inline-block">User Photo</span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full py-2"
              />
            </label>
            {previewUrl ? (
              <div
                className="w-full rounded-lg border p-2 flex items-center gap-3"
                style={{
                  background: "var(--color-light-secondary)",
                  borderColor: "rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="text-xs opacity-80">
                  Preview of your selected image
                </span>
              </div>
            ) : null}
          </div>

          <label
            className="text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            <span className="mb-1 inline-block">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                background: "var(--color-light-secondary)",
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          </label>

          {/* {passwordError ? (
            <div
              className="rounded-lg"
              style={{
                color: "#c0392b",
                background: "rgba(192,57,43,0.08)",
                border: "1px solid rgba(192,57,43,0.25)",
                padding: "8px 10px",
                marginTop: 4,
                marginBottom: 4,
                fontSize: 13,
              }}
            >
              {passwordError}
            </div>
          ) : null} */}

          <label
            className="text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            <span className="mb-1 inline-block">Password</span>
            <input
              type="password"
              name="password"
              //   onInput={(e) => {
              //     const value = e.target.value || "";
              //     if (!passwordPattern.test(value)) {
              //       setPasswordError(
              //         "Password must be 6+ chars with upper and lower case."
              //       );
              //     } else {
              //       setPasswordError("");
              //     }
              //   }}
              required
              placeholder="Create a password"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                background: "var(--color-light-secondary)",
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          </label>
          

          <button
            type="submit"
            className="mt-2 px-4 py-3 rounded-lg font-bold hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--color-light-accent)",
              color: "var(--color-light-text)",
            }}
          >
            Register
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 font-semibold">Or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <SocialLogin />
        </div>
      </form>
    </div>
  );
};

export default Register;
