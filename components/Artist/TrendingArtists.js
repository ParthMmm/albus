import React from "react";
import useSWR from "swr";
import { chartTopArtists } from "../../utils/fetch";
import Artist from "./Artist";
import { Box, Grid, Skeleton, Heading, Text } from "@chakra-ui/react";
import fetcher from "../../utils/fetcher";

function TrendingArtists() {
  const { data, error, isValidating } = useSWR(chartTopArtists, fetcher);

  if (data) {
    return (
      <>
        <Box mb={4}>
          <Heading>trending artists</Heading>
          <Text>this week</Text>
        </Box>
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
      </>
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
  return null;
}

export default TrendingArtists;
