import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
const ActionContext = createContext();

export function ActionProvider({ children }) {
  const action = useProvideAction();

  return (
    <ActionContext.Provider value={action}>{children}</ActionContext.Provider>
  );
}

export function useAction() {
  return useContext(ActionContext);
}

function useProvideAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const readCookie = () => {
    const authState = Cookies.get("albus-auth");
    if (authState) {
      setLoading(false);
      const parsedUser = JSON.parse(authState);
      setUser(parsedUser);
    } else {
      setLoading(false);
      setUser(false);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);

  const addListened = async (data) => {
    setLoading(true);
    const stringData = JSON.stringify(data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addListened`,
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
  };
  const addWantToListen = async (data) => {
    setLoading(true);
    const stringData = JSON.stringify(data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addWantToListen`,
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
  };
  const addListening = async (data) => {
    setLoading(true);
    const stringData = JSON.stringify(data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addListening`,
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
  };

  const updateInfo = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/updateInfo`,
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    if (res.status === 200) {
      router.push("/home");
    }
  };
  return {
    addListened,
    addWantToListen,
    addListening,
    updateInfo,
    loading,
  };
}
