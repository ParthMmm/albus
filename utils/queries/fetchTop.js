import axios from "axios";
import { chartTopArtists, chartTopTracks, tagTopAlbumsFetch } from "../fetch";

async function fetchTopArtists() {
  return axios.get(chartTopArtists).then((res) => res.data);
}

async function fetchTopTracks() {
  return axios.get(chartTopTracks).then((res) => res.data);
}

async function fetchTopAlbums(genre) {
  return axios.get(tagTopAlbumsFetch + `&tag=${genre}`).then((res) => {
    res.data;
    // console.log(res.data);
  });

  // const { data } = await axios.get(tagTopAlbumsFetch + `&tag=${genre}`);
  // return data;
}

export { fetchTopArtists, fetchTopTracks, fetchTopAlbums };
