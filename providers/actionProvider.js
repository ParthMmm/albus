import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "./authProvider";
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
  const [reviewCreated, setReviewCreated] = useState(false);

  const auth = useAuth();

  const addListened = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addListened`,
      data,
      { headers: { Authorization: `Bearer ${auth.user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };
  const addWantToListen = async (data) => {
    setLoading(true);
    const stringData = JSON.stringify(data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addWantToListen`,
      data,
      { headers: { Authorization: `Bearer ${auth.user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };
  const addListening = async (data) => {
    setLoading(true);
    const stringData = JSON.stringify(data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/addListening`,
      data,
      { headers: { Authorization: `Bearer ${auth.user.token}` } }
    );
    if (res.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };

  const createReview = async (data) => {
    setLoading(true);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/createReview`,
      data,
      { headers: { Authorization: `Bearer ${auth.user.token}` } }
    );
    if (res.status === 200) {
      setReviewCreated(true);
      setLoading(false);
    }
  };
  return {
    addListened,
    addWantToListen,
    addListening,
    loading,
    createReview,
    reviewCreated,
    setReviewCreated,
  };
}
