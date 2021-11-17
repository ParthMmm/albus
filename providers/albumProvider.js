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

    if (res.status === 200) {
      setAlbumID(res.data.id);
      setLoading(false);
      console.log(res.data.id);
    } else {
      setError("error");
      setLoading(false);
    }
  };

  return {
    album,
    loading,
    error,
    getID,
    albumID,
  };
}
