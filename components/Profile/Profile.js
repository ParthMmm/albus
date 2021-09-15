import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Center,
  Text,
  Skeleton,
  useColorMode,
  Grid,
  Link,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import Avatar, { genConfig } from "react-nice-avatar";
import SavedAlbums from "./SavedAlbums";
import { useRouter } from "next/router";
import { FaSpotify, FaLastfmSquare, FaTwitter } from "react-icons/fa";
import Album from "../Album/Album";
function Profile() {
  const auth = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();
  let lengthArr = [];

  const latestActivity = () => {
    if (auth.userInfo) {
      lengthArr.push({
        album: auth.userInfo?.actions?.listened?.at(0),
        name: "listened",
      });
      lengthArr.push({
        album: auth.userInfo?.actions?.listening?.at(0),
        name: "listening",
      });
      lengthArr.push({
        album: auth.userInfo?.actions?.wantToListen?.at(0),
        name: "want to listen",
      });
      console.log(auth.userInfo);

      console.log(lengthArr);
    }
  };

  // if(randomNum === 1){
  //   let album =
  // }
  // if(randomNum === 2){

  // }if(randomNum === 3){

  // }
  let userID;
  let randomNum;
  useEffect(() => {
    userID = router.query.pid;
    if (userID) {
      auth.fetchUserInfo(userID);
    }
    latestActivity();
    randomNum = Math.floor(Math.random() * 3);
    console.log(randomNum);
    console.log(lengthArr[randomNum]);
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
          w="25%"
          mx="auto"
          mt={10}
          color={{ dark: "white", light: "black" }}
          d="flex"
          boxShadow="lg"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          border="5px solid"
          borderColor="purple.600"
          borderRadius="sm"
          rounded="xl"
        >
          <Box>
            <Box p="5">
              <Avatar
                style={{ width: "8rem", height: "8rem" }}
                {...config}
              ></Avatar>
              <Heading mt={2}>{auth.userInfo?.username}</Heading>
            </Box>

            <Box d="flex" justifyContent="center" flexDir="column" mb={4}>
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                p={2}
                alignItems="baseline"
              >
                <Box>
                  <Text>#️⃣</Text>
                </Box>

                <Box>
                  <Text as="span" p={2} fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.genre}
                  </Text>
                </Box>
              </Box>
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                p={2}
                alignItems="baseline"
              >
                <Box>
                  <Text>😎</Text>
                </Box>

                <Box>
                  <Text as="span" p={2} fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.artist}
                  </Text>
                </Box>
              </Box>
              <Box
                d="flex"
                flexDir="row"
                justifyContent="center"
                p={2}
                alignItems="baseline"
              >
                <Box>
                  <Text>💿</Text>
                </Box>

                <Box>
                  <Text as="span" m={2} fontWeight="bold" fontSize="lg">
                    {auth.userInfo?.info?.album}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* <Box pl="10" d="flex" mt={10} flexDir="column">
            <Link
              href="https://open.spotify.com/user/parth.m?si=3b7e9659fb724fce"
              pb={3}
            >
              <Icon as={FaSpotify} w={6} h={6} color="#1ad860" />
              <Text as="span" pl={2}>
                {" "}
                parth.m
              </Text>
            </Link>

            <Link href="https://www.last.fm/user/Parth_M" pb={3}>
              <Icon as={FaLastfmSquare} w={6} h={6} color="#ba0001" />
              <Text as="span" pl={2}>
                {" "}
                Parth_M
              </Text>
            </Link>

            <Link href="https://twitter.com/parthmmm">
              <Icon as={FaTwitter} w={6} h={6} color="#1b9cef" />
              <Text as="span" pl={2}>
                {" "}
                parthmmm
              </Text>
            </Link>
          </Box> */}
        </Box>

        <Box>
          {" "}
          <SavedAlbums />
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
