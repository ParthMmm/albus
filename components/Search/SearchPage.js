import React from "react";
import { useRouter } from "next/router";
import Album from "../Album/Album";
import useSWR from "swr";
import { albumSearchFetch } from "../../utils/fetch";
import { Heading, Box, Skeleton, Grid, Text } from "@chakra-ui/react";
import SearchResults from "./SearchResults";
import albumImageCheck from "../../utils/albumCheck";
function SearchPage() {
  const router = useRouter();
  const { input } = router.query;
  let albums = [];

  const { data, error, isValidating } = useSWR(
    albumSearchFetch + `&album=${input}`,
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
      <div>
        <Box w="80%" h="50rem" mx="auto" mt={10} color="white" rounded="lg">
          <Skeleton
            startColor="orange.500"
            endColor="purple.500"
            height="50rem"
          />
        </Box>
      </div>
    );
  }
  if (data) {
    albums = data?.results.albummatches.album;
    let filtered = albumImageCheck(albums);
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Box mb={4}>
          <Heading>{input}</Heading>
          <Text>results</Text>
        </Box>
        <SearchResults albums={filtered} />
      </Box>
    );
  } else {
    return (
      <div>
        <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
          <Skeleton
            startColor="orange.500"
            endColor="purple.500"
            height="50rem"
          />
        </Box>
      </div>
    );
  }
}

export default SearchPage;
