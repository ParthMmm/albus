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
  const [reviews, setReviews] = useState("");

  const handleAlbum = async (mbid, albumName, artist) => {
    if (mbid || (albumName && artist)) {
      const album = await formatAlbum(mbid, albumName, artist);
      setAlbum(album);
      setAlbumID(mbid);
      setLoading(false);
      return;
    }
    setAlbum(false);
    setLoading(false);

    return;
  };
  const getID = async (albumName, artist) => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/album_id?album=${albumName}&artist=${artist}`
    );

    if (res.status === 200) {
      handleAlbum(res.data.id, albumName, artist);
      setLoading(false);
      return;
    } else {
      setError("error");
      setLoading(false);
    }
    return;
  };
  const fetchReviews = async () => {
    if (album?.albumName && album?.artist) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchAlbumReviews?albumName=${album.albumName}&artist=${album.artist}`
      );
      if (res.status === 200) {
        setReviews(res.data);
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    }
    return;
  };

  return {
    album,
    loading,
    error,
    getID,
    albumID,
    fetchReviews,
    reviews,
  };
}

const formatAlbum = async (mbid, albumName, artist) => {
  return {
    mbid: mbid,
    albumName: albumName,
    artist: artist,
  };
};
