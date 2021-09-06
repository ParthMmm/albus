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

  const userID = router.query.pid;
  console.log(userID);
  useEffect(() => {
    if (userID) {
      auth.fetchUserInfo(userID);
    }

    console.log(auth.userInfo);
  }, []);

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

  if (auth.userInfo && !auth.loading) {
    return (
      <>
        <Box
          bg="gray.600"
          w="20%"
          h="30rem"
          mx={32}
          color="white"
          rounded="lg"
          shadow="sm"
        >
          {" "}
          <Box d="flex" flexDir="column" alignItems="center" pt={10}>
            {" "}
            <Avatar
              style={{ width: "8rem", height: "8rem" }}
              {...config}
            ></Avatar>
            <Heading mt={2}>{auth.userInfo?.username}</Heading>
          </Box>
          <Box
            d="flex"
            flexDir="column"
            alignItems="flex-start"
            pt={10}
            ml={10}
          >
            <Heading fontSize="md" mt={2}>
              Genre
            </Heading>
            <Text>wave</Text>
            <Heading fontSize="md" mt={2}>
              Artist
            </Heading>
            <Text>Frank Ocean</Text>
            <Heading fontSize="md" mt={2}>
              Album
            </Heading>
            <Text>Blond</Text>
          </Box>
        </Box>{" "}
        <SavedAlbums />
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
