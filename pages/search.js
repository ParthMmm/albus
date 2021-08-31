import React from "react";
import Album from "../components/Album";
import { useRouter } from "next/router";
import useSWR from "swr";
import { albumSearchFetch } from "../utils/fetch";
import {
  Heading,
  Box,
  Skeleton,
  Grid,
  SimpleGrid,
  Text,
  Center,
} from "@chakra-ui/react";
import Header from "../components/Header";

function search() {
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
  if (!data) {
    return (
      <div>
        <Header />
        <Box>
          <Skeleton
            startColor="orange.500"
            endColor="purple.500"
            height="25rem"
            width="100%"
          />
        </Box>
      </div>
    );
  }
  if (error || isValidating) {
    console.log("Poop");
  }
  albums = data?.results.albummatches.album;
  console.log(albums);

  return (
    <div>
      <Header />

      <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
        <Box mb={4}>
          <Heading>{input}</Heading>
          <Text>results</Text>
        </Box>
        {error || isValidating ? (
          <Center>
            <SimpleGrid columns="1" row="2" gap={1}>
              <Box>
                <Skeleton
                  startColor="purple.500"
                  endColor="orange.500"
                  height="25rem"
                  width="100%"
                />
              </Box>
              <Box>
                <Skeleton
                  startColor="orange.500"
                  endColor="purple.500"
                  height="25rem"
                  width="100%"
                />
              </Box>
            </SimpleGrid>
          </Center>
        ) : (
          <Grid
            gridTemplateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(5, 1fr)",
            ]}
            gap={3}
          >
            {albums.map((album) => (
              <>
                <Album key={album.artist.mbid} thing={album} />
              </>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default search;
