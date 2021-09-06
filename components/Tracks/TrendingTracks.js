import React from "react";
import useSWR from "swr";
import { chartTopTracks } from "../../utils/fetch";
import Track from "./Track";
import { Spinner, Flex, Grid, Box, GridItem, Skeleton } from "@chakra-ui/react";

function TrendingTracks() {
  const { data, error, isValidating } = useSWR(chartTopTracks, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    dedupingInterval: 1000000,
  });
  if (data) {
    return (
      <div>
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
      </div>
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

export default TrendingTracks;
