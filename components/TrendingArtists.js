import { Spinner, Flex, Grid, Box, GridItem } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { chartTopArtists } from "../utils/fetch";
import Artist from "./Artist";
function TrendingArtists() {
  const { data, error, isValidating } = useSWR(chartTopArtists + `&limit=10`, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    dedupingInterval: 1000000,
  });
  if (data) {
    // console.log(data.artists.artist);
    return (
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {data.artists.artist.map((artist) => (
          <Artist key={artist.mbid} artist={artist} />
        ))}
      </Grid>
    );
  }
  if (error || isValidating) {
    return <Spinner />;
  }
}

export default TrendingArtists;
