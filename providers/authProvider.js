import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const register = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/signup`,
      data
    );

    if (res.status === 201) {
      setError(res.data.msg);
      console.log(res.data.msg);
    } else {
      console.log(res.data);
      handleUser(res.data);
      router.push("/home");
    }
  };

  const login = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/login`,
      data
    );
    if (res.status === 201) {
      setError(res.data.msg);
      console.log(res.data.msg);
    } else {
      console.log(res.data);
      handleUser(res.data);
      router.push("/home");
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
  };
}

const formatUser = async (user) => {
  return {
    user_id: user.id,
    token: user.token,
    username: user.username,
  };
};
