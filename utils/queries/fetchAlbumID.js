import React from "react";
import axios from "axios";

async function fetchAlbumID(albumName, artist) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/album_id?album=${albumName}&artist=${artist}`
  );

  return data.id;
}

export default fetchAlbumID;
