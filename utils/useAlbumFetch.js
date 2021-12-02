import React from "react";
import useSWR from "swr";
import { fetchAlbumReviews } from "./fetch";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

async function useAlbumFetch(albumName, artist) {
  // const { isLoading, error, data } = useQuery("fetchReviews", () =>
  //   fetch(fetchAlbumReviews + `?albumName=${albumName}&artist=${artist}`).then(
  //     (res) => {
  //       res.json();
  //       console.log(res);
  //     }
  //   )
  // );

  const { data } = await axios.get(
    fetchAlbumReviews + `?albumName=${albumName}&artist=${artist}`
  );
  // console.log(data);
  return data;
  // const { data, error } = useSWR(
  //   fetchAlbumReviews + `?albumName=${albumName}&artist=${artist}`
  // );

  console.log(isLoading, error, data);
  // let x;
  // if (data) {
  //   x = data.map((review) => {
  //     return review.rating;
  //   });
  //   x = _.round(_.mean(x));
  // }
  // return {
  //   reviews: data,
  //   isLoading: isLoading,
  //   isError: error,
  //   avgRating: x,
  // };
}

export default useAlbumFetch;
