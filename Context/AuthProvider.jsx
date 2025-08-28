
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  //ONAUTH STATE CHANGED
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const AuthInfo = {
    createUser,
    loading,
    user,
  };
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;
