import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { albumInfoFetch } from "../utils/fetch";
const AlbumContext = createContext();

export function AlbumProvider({ children }) {
  const album = useProvideAlbum();

  return (
    <AlbumContext.Provider value={album}>{children}</AlbumContext.Provider>
  );
}

export function useAlbum() {
  return useContext(AlbumContext);
}

function useProvideAlbum() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [albumID, setAlbumID] = useState("");

  const handleAlbum = (rawAlbum) => {};

  const getID = async (albumName, artist) => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/album_id?album=${albumName}&artist=${artist}`
    );

    if (res.status === 201) {
      setError("error");
      setLoading(false);

      //   console.log(res.data.msg);
    } else {
      console.log(res.data.id);
      setAlbumID(res.data.id);
      setLoading(false);
    }
  };

  //   const getInfo = async (mbid) => {
  //     setLoading(true);
  //     const res = await axios.get(`${albumInfoFetch}&mbid=${mbid}`);

  //     console.log(res.data);
  //   };

  return {
    album,
    loading,
    error,
    getID,
    albumID,
  };
}

// const formatUser = async (user) => {
//   return {
//     user_id: user.id,
//     token: user.token,
//     username: user.username,
//   };
// };
