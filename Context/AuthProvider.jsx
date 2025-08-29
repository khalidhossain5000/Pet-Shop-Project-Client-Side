import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../src/firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
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
      // console.log(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const AuthInfo = {
    createUser,
    loading,
    user,
    loginUser,
    googleLogin,
    updateUserProfile,
    setUser,
    logoutUser,
  };
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;
