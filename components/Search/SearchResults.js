import React from "react";
import { useRouter } from "next/router";
import Album from "../Album/Album";
import useSWR from "swr";
import { albumSearchFetch } from "../../utils/fetch";
import { Heading, Box, Skeleton, Grid, Text } from "@chakra-ui/react";
function SearchResults({ albums }) {
  return (
    <Grid
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap={4}
      pb={10}
    >
      {albums.map((album) => (
        <>
          <Album key={album.artist.mbid} thing={album} />
        </>
      ))}
    </Grid>
  );
}

export default SearchResults;
