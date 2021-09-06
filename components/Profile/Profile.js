import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Center,
  Text,
  Grid,
  GridItem,
  Skeleton,
  SimpleGrid,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import Avatar, { genConfig } from "react-nice-avatar";
import SavedAlbums from "./SavedAlbums";
import { useRouter } from "next/router";

function Profile() {
  const auth = useAuth();
  const router = useRouter();

  let userID;
  useEffect(() => {
    userID = router.query.pid;
    console.log(userID);
    if (userID) {
      auth.fetchUserInfo(userID);
    }

    console.log(auth.userInfo);
  }, [router.query]);

  const config = {
    sex: "man",
    faceColor: "#AC6651",
    earSize: "big",
    eyeStyle: "smile",
    noseStyle: "long",
    mouthStyle: "smile",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#D2EFF3",
    eyeBrowStyle: "up",
    shirtColor: "#F4D150",
    bgColor: "#FC909F",
  };
  const myConfig = genConfig(config);

  if (auth.loading) {
    return (
      <>
        <Box w="20%" h="30rem" mx={32} color="white" rounded="lg" shadow="sm">
          <Skeleton startColor="pink.500" endColor="orange.500" h="30rem" />
        </Box>
        <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
          <Skeleton startColor="pink.500" endColor="orange.500" h="50rem" />
        </Box>
      </>
    );
  }
  if (!auth.userInfo) {
    return (
      <>
        <Box w="20%" h="30rem" mx={32} color="white" rounded="lg" shadow="sm">
          <Skeleton startColor="pink.500" endColor="orange.500" h="30rem" />
        </Box>
        <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
          <Skeleton startColor="pink.500" endColor="orange.500" h="50rem" />
        </Box>
      </>
    );
  }

  if (auth.userInfo && !auth.loading) {
    return (
      <>
        <Box flexDir="row" justifyContent="space-between">
          <Box
            bg="gray.600"
            w="80%"
            mx="auto"
            mt={10}
            color="white"
            d="flex"
            rounded="lg"
            boxShadow="lg"
            flexDir="column"
            alignItems="flex-start"
          >
            {" "}
            <Box p="5" d="flex" flexFlow="column wrap" justifyContent="center">
              {" "}
              <Avatar
                style={{ width: "8rem", height: "8rem" }}
                {...config}
              ></Avatar>
              <Heading mt={2}>{auth.userInfo?.username}</Heading>
            </Box>
            <Box d="flex" flexDir="column" alignItems="flex-start" p={5}>
              <Heading fontSize="md" mt={2}>
                Genre
              </Heading>
              <Text>{auth.userInfo?.info?.genre}</Text>
              <Heading fontSize="md" mt={2}>
                Artist
              </Heading>
              <Text>{auth.userInfo?.info?.artist}</Text>
              <Heading fontSize="md" mt={2}>
                Album
              </Heading>
              <Text>{auth.userInfo?.info?.album}</Text>
            </Box>
          </Box>{" "}
          <Box>
            {" "}
            <SavedAlbums />
          </Box>
        </Box>
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

export default Profile;
