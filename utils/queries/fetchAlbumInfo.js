import React from "react";
import { albumInfoFetch } from "../fetch";
import axios from "axios";

function fetchAlbumInfo(albumName, artist) {
  //   const { data } = await axios.get(`
  //     ${albumInfoFetch} + &album=${albumName}&artist=${artist}`);

  //   console.log(data);

  //   return data;

  return axios
    .get(
      `
${albumInfoFetch} + &album=${albumName}&artist=${artist}`
    )
    .then((res) => res.data);
}

export default fetchAlbumInfo;
