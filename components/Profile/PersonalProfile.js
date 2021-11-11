import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../providers/authProvider";
import {
  Box,
  Heading,
  Center,
  Text,
  Skeleton,
  Grid,
  Button,
  Icon,
  Link,
  Image,
} from "@chakra-ui/react";
import SavedAlbums from "./SavedAlbums";
import { FaSpotify, FaLastfmSquare } from "react-icons/fa";

function PersonalProfile() {
  const auth = useAuth();
  const router = useRouter();

  let userID;
  useEffect(() => {
    userID = router.query.pid;
    if (userID) {
      auth.fetchUser();

      console.log(userID);
    }
  }, [router.query]);
  if (auth.loading) {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Grid gridTemplateColumns={["repeat(5, 1fr)"]} gap={3}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                startColor="orange.500"
                endColor="purple.500"
                height="25rem"
                key={i}
              />
            ))}
          </Grid>
        </Box>
      </>
    );
  }
  if (!auth.userInfo) {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
        <Box w="80%" h="50rem" mx="auto" mt={10}>
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="50rem"
            rounded="lg"
          />
        </Box>
      </>
    );
  }

  if (auth.userInfo && !auth.loading) {
    return (
      <>
        <Box
          // w={{ base: "80%", md: "40%", lg: "40%" }}
          // mx="auto"
          // mt={10}
          // color={{ dark: "white", light: "black" }}
          // d="flex"
          // boxShadow="lg"
          // // flexFlow="column"
          // border="5px solid"
          // borderColor="purple.600"
          // borderRadius="sm"
          // rounded="xl"
          w={{ base: "80%", md: "40%", lg: "40%" }}
          mx="auto"
          mt={10}
          d="flex"
          flexGrow="1"
          justifyContent={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "space-between",
          }}
          border="5px solid"
          borderColor="purple.600"
          borderRadius="sm"
          rounded="xl"
          boxShadow="lg"
          flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        >
          <Box
            // d="flex"
            // justifyContent="space-evenly"
            // m="2"
            // flexDir={{ base: "row", sm: "row", md: "row", lg: "row" }}
            p="5"
            d="flex"
            justifyContent={{ base: "center", sm: "center", md: "center" }}
            alignItems="center"
            // alignItems={{ base: "center", sm: "center", md: "center", lg: "" }}
            flexShrink={{ sm: "1", md: "0" }}
            flexFlow="column wrap"
            // color={colorMode === "dark" ? "white" : "black"}
          >
            <Box alignItems="center" justifyContent="center">
              {" "}
              <Box mt={3} mb={2} justifyContent="center">
                {" "}
                <Heading>{auth.userInfo?.username}</Heading>
              </Box>
              <Box
                d="flex"
                flexDir="row"
                justifyContent={{
                  base: "center",
                  sm: "center",
                  md: "flex-start",
                }}
              >
                {auth?.userInfo?.info?.spotify ? (
                  <Link
                    href={`https://open.spotify.com/user/${auth?.userInfo?.info?.spotify}`}
                  >
                    {" "}
                    <Icon as={FaSpotify} w={5} h={5} mr={2} color="#1DB954" />
                  </Link>
                ) : (
                  <></>
                )}
                {auth?.userInfo?.info?.lastfm ? (
                  <Link
                    href={`https://www.last.fm/user/${auth?.userInfo?.info?.lastfm}`}
                  >
                    <Icon as={FaLastfmSquare} w={5} h={5} color="#c3000d " />
                  </Link>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            d="flex"
            alignItems={{ base: "center", md: "baseline" }}
            flexDir="column"
            p={{ base: "1", md: "5" }}
            justifyContent="space-evenly"
            // p={{ base: "1", sm: "1", md: "1", lg: "10" }}
          >
            {auth.userInfo?.info?.genre ? (
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Box>
                  <Text>#️⃣</Text>
                </Box>

                <Box>
                  <Text as="span" mx="2" fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.genre}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
            {auth.userInfo?.info?.artist ? (
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Box>
                  <Text>😎</Text>
                </Box>

                <Box>
                  <Text as="span" mx="2" fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.artist}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
            {auth.userInfo?.info?.album ? (
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Box>
                  <Text>💿</Text>
                </Box>

                <Box>
                  <Text as="span" mx="2" fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.album}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box
            d="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            flexDir="row"
            m={5}
            // mr={{ base: "0", md: "-4", lg: "-24" }}
          ></Box>
        </Box>

        <Box>
          <SavedAlbums profile={auth.userInfo} />
        </Box>
      </>
    );
  }
  if (auth.user.user_id === userID) {
    return (
      <>
        <Text>its me</Text>
      </>
    );
  } else {
    return (
      <Center>
        <Heading>hmm something is missing</Heading>
      </Center>
    );
  }
}

export default PersonalProfile;
