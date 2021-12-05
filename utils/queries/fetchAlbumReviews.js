import React from "react";
import axios from "axios";
import { albumReviewsFetch } from "../fetch";

async function fetchAlbumReviews(albumName, artist) {
  const { data } = await axios.get(
    albumReviewsFetch + `?albumName=${albumName}&artist=${artist}`
  );

  // console.log(data);

  return data;
}

export default fetchAlbumReviews;
