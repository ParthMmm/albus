import React from "react";
import useSWR from "swr";
import { Box, Grid, Skeleton } from "@chakra-ui/react";
import { tagTopAlbumsFetch } from "../../utils/fetch";
import Album from "./Album";

function TopAlbums() {
  let albums = [];

  const { data, error, isValidating } = useSWR(
    tagTopAlbumsFetch + "&tag=dance",
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      dedupingInterval: 1000000,
    }
  );

  if (error || isValidating) {
    return (
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={4}
      >
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
        />
      </Grid>
    );
  }
  if (data) {
    albums = data.albums.album;
    return (
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={4}
      >
        {albums.map((album) => (
          <Album key={album.artist.mbid} thing={album} />
        ))}
      </Grid>
    );
  }
  return <div></div>;
}

export default TopAlbums;
