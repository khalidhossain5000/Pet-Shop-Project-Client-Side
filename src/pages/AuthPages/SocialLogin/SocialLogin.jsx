import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const { updateUserProfile, setUser } = useAuth();
  const handleGoogleRegister = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        // Successful Google auth
        // update user profile in firebase
        const userProfile = {
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        };

        updateUserProfile(userProfile)
          .then(() => {
            setUser({
              ...user,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            });
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
        navigate("/");
      })
      .catch(() => {
        toast.error("Google signup failed");
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleRegister}
      className="mt-3 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border hover:bg-black/5 cursor-pointer w-full"
      style={{
        color: "var(--color-light-text)",
        borderColor: "rgba(0,0,0,0.12)",
      }}
    >
      <FcGoogle className="text-xl" />
      Continue With Google
    </button>
  );
};

export default SocialLogin;
