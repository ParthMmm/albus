import React from "react";
import useSWR from "swr";
import Track from "./Track";
import { Grid, Box, Skeleton, Heading, Text } from "@chakra-ui/react";
import fetcher from "../../utils/fetcher";
import { fetchTopTracks } from "../../utils/queries/fetchTop";
import { useQuery } from "react-query";

function TrendingTracks() {
  const { data, error, isLoading } = useQuery("chartTopTracks", () =>
    fetchTopTracks()
  );
  if (data) {
    return (
      <>
        <Box mb={4}>
          <Heading>trending tracks</Heading>
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
          {data.tracks.track.map((track) => (
            <Track key={track.url} track={track} />
          ))}
        </Grid>
      </>
    );
  }
  if (error || isLoading) {
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

export default TrendingTracks;
