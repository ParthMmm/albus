import React, { useState, useEffect, useContext, createContext } from "react";
import router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { albumInfoFetch } from "../utils/fetch";
import _ from "lodash";

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
  const [numReviews, setNumReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [filtered, setFiltered] = useState(0);
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
  const fetchReviews = async (albumName, artist) => {
    if (!albumName && !artist) {
      albumName = album?.albumName;
      artist = album?.artist;
    }

    if (artist && albumName) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchAlbumReviews?albumName=${albumName}&artist=${artist}`
      );
      if (res.status === 200) {
        setReviews(res.data);
        setNumReviews(res.data.length);

        let x = res.data.map((review) => {
          return review.rating;
        });

        setAvgRating(_.round(_.mean(x)));
        setLoading(false);
        return;
      }
      setReviews("");
      setNumReviews(0);
      setAvgRating(0);
      setLoading(false);
      return;
    }
    return;
  };

  const filterReviews = async (filter) => {
    if (reviews && filter === "date") {
      let result = reviews.sort((a, b) => b.datePosted - a.datePosted);
      setReviews(result);
      setFiltered(true);
    }
    if (reviews && filter === "rating") {
      //descending order
      let result = reviews.sort((a, b) => b.rating - a.rating);
      setReviews(result);
      setFiltered(true);
    }

    return;
  };

  const resetReviews = () => {
    setReviews("");
    setNumReviews(0);
    setAvgRating(0);
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
    numReviews,
    avgRating,
    setReviews,
    resetReviews,
    filterReviews,
    filtered,
  };
}

const formatAlbum = async (mbid, albumName, artist) => {
  return {
    mbid: mbid,
    albumName: albumName,
    artist: artist,
  };
};
