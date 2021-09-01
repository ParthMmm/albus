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

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      const userString = JSON.stringify(user);

      Cookies.set("albus-auth", userString, { expires: 7 });
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      Cookies.remove("albus-auth");
      setLoading(false);
      return false;
    }
  };

  const readCookie = () => {
    const authState = Cookies.get("albus-auth");
    if (authState) {
      setLoading(false);
      const parsedUser = JSON.parse(authState);
      console.log(parsedUser);
      setUser(parsedUser);
    } else {
      setLoading(false);
      setUser(false);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);

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
      router.push("/");
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

      router.push("/");
    }
  };

  const fetchUser = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/fetchUser`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    user.actions = res.data.actions;
  };
  const logout = () => {
    console.log("logging out");
    handleUser(false);
    router.push("/");
  };

  return {
    user,
    loading,
    error,
    fetchUser,
    login,
    register,
    logout,
  };
}

const formatUser = async (user) => {
  return {
    user_id: user.id,
    token: user.token,
    username: user.username,
    actions: {},
  };
};
