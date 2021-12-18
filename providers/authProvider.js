import React, { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

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
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);
  const [reviews, setReviews] = useState(null);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    setLoading(true);

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
      router.push("/");
      return false;
    }
  };

  const handleUserInfo = async (rawUser) => {
    setLoading(true);

    if (rawUser) {
      const user = await formatUserInfo(rawUser);
      const userString = JSON.stringify(user);

      Cookies.set("albus-userInfo", userString, { expires: 7 });

      setUserInfo(user);
      setListened(user.actions.listened);
      setWantToListen(user.actions.wantToListen);
      setListening(user.actions.listening);

      setLoading(false);

      return user;
    } else {
      setUserInfo(false);
      Cookies.remove("albus-userInfo");
      setLoading(false);

      return false;
    }
    return;
  };

  const readCookie = () => {
    const authState = Cookies.get("albus-auth");
    const infoState = Cookies.get("albus-userInfo");
    if (authState) {
      setLoading(false);
      const parsedUser = JSON.parse(authState);
      setUser(parsedUser);
    } else {
      setLoading(false);
      setUser(false);
    }

    if (infoState) {
      const parsedInfo = JSON.parse(infoState);
      setUserInfo(parsedInfo);
    }
    return;
  };
  useEffect(() => {
    readCookie();
  }, []);

  const register = async (data) => {
    setLoading(true);
    setMessage("");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/signup`,
      data
    );

    if (res.data?.error) {
      console.log(res.data.error);
      setError(res.data.error);
      setLoading(false);
      setMessage("");
      return res.data.error;
    } else {
      if (handleUser(res.data)) {
        setMessage("success! 🎉");
        setError("");

        router.push("/");
        return;
      }
    }
    return;
  };

  const login = async (data) => {
    setLoading(true);
    setMessage("");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/login`,
      data
    );

    if (res.data?.error) {
      console.log(res.data.error);
      setError(res.data.error);
      setLoading(false);
      setMessage("");

      return res.data.error;
    } else {
      if (handleUser(res.data)) {
        setError("");
        setMessage("success! 🎉");
        router.push("/");

        return;
      }
    }
    return;
  };

  const fetchUser = async () => {
    setLoading(true);
    setError("");

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/fetchUser`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    if (res.status === 200) {
      handleUser(res.data);
      setLoading(false);

      return;
    }

    setLoading(false);
    return;
  };

  const logout = () => {
    handleUserInfo(false);
    handleUser(false);
  };

  return {
    user,
    userInfo,
    loading,
    error,
    message,
    setError,
    setMessage,
    fetchUser,
    login,
    register,
    logout,
    listening,
    setWantToListen,
    listening,
    readCookie,
  };
}

const formatUser = async (data) => {
  return {
    user_id: data.id,
    token: data.token,
    username: data.username,
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
    info: {
      genre: data.info?.genre,
      artist: data.info?.artist,
      album: data.info?.album,
      spotify: data.info?.spotify,
      lastfm: data.info?.lastfm,
    },
  };
};
