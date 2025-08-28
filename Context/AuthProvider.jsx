
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../src/firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
    //user updated related
    const updateUserProfile = (profileInfo) => {
      return updateProfile(auth.currentUser, profileInfo);
    };


    //logout
    const logoutUser = () => {
      return signOut(auth);
    };

  //ONAUTH STATE CHANGED
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      setLoading(false);
      console.log(currentUser);
    })

    return () => {
      unSubscribe();
    };
  }, []);
  const AuthInfo = {
    createUser,
    loading,
    user,
    loginUser,
    updateUserProfile,
    setUser,
    logoutUser
  };
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;
