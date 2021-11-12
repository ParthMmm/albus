import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

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
  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);

  const router = useRouter();

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
      setUser(false);
      Cookies.remove("albus-auth");
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
    } else {
      handleUserInfo(res.data);
      router.push("/");
    }
  };

  const login = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/login`,
      data
    );
    if (res.status === 401) {
      setError(res.data.msg);
    } else {
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

    if (res.status === 200) {
      handleUser(res.data);
      setLoading(false);

      return;
    }

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
      setLoading(false);

      return;
    } else {
      setLoading(false);
    }
  };

  const logout = () => {
    handleUserInfo(false);
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
      genre: data.info.genre,
      artist: data.info.artist,
      album: data.info.album,
      spotify: data.info.spotify,
      lastfm: data.info.lastfm,
    },
  };
};
