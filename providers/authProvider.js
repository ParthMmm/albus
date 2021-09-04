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
  const [userInfo, setUserInfo] = useState(null);
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      const userString = JSON.stringify(user);

      Cookies.set("albus-auth", userString, { expires: 7 });
      setUser(user);
      return user;
    } else {
      setUser(false);
      Cookies.remove("albus-auth");
      setLoading(false);
      return false;
    }
  };

  const handleUserInfo = async (rawUser) => {
    // console.log(rawUser);
    if (rawUser) {
      const user = await formatUserInfo(rawUser);
      setUserInfo(user);
      setLoading(false);
      return user;
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
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/fetchUser`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    user.actions = res.data.actions;
    setLoading(false);
  };

  const fetchUserInfo = async (data) => {
    setLoading(true);

    const userID = { userID: data };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchUserInfo`,
      userID
    );
    if (res.status === 200) {
      handleUserInfo(res.data);
      // console.log(res.data);
      return;
    } else {
      // console.log(res, data);
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("logging out");
    handleUser(false);
    router.push("/");
  };

  return {
    user,
    userInfo,
    loading,
    error,
    fetchUser,
    fetchUserInfo,
    login,
    register,
    logout,
  };
}

const formatUser = async (data) => {
  return {
    user_id: data.id,
    token: data.token,
    username: data.username,
    actions: {},
  };
};

const formatUserInfo = async (data) => {
  return {
    user_id: data._id,
    username: data.username,
    actions: {
      listened: data.listened,
      wantToListen: data.wantToListen,
      listening: data.listening,
    },
  };
};
