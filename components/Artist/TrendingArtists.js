import React from "react";
import useSWR from "swr";
import { chartTopArtists } from "../../utils/fetch";
import Artist from "./Artist";
import { Box, Grid, Skeleton } from "@chakra-ui/react";

function TrendingArtists() {
  const { data, error, isValidating } = useSWR(chartTopArtists, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    dedupingInterval: 1000000,
  });
  if (data) {
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
          <Artist key={artist.url} artist={artist} />
        ))}
      </Grid>
    );
  }
  if (error || isValidating) {
    return (
      <Box>
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
        />
      </Box>
    );
  }
}

export default TrendingArtists;
