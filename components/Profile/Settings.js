import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/authProvider";
import { useForm } from "react-hook-form";
import {
  Center,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  ButtonGroup,
  useColorMode,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useAction } from "../../providers/actionProvider";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

function Settings() {
  const auth = useAuth();
  const action = useAction();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { colorMode } = useColorMode();
  let userID;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    action.updateInfo(data);
    reset();
  };

  useEffect(() => {
    if (auth.user) {
      auth.fetchUser();
    }
    if (auth.userInfo?.info) {
      reset({
        genre: auth.userInfo.info.genre,
        artist: auth.userInfo.info.artist,
        album: auth.userInfo.info.album,
        spotify: auth.userInfo.info.spotify,
        lastfm: auth.userInfo.info.lastfm,
      });
    }
    userID = router.query.pid;
    if (userID) {
      // auth.fetchUserInfo(userID);
      if (auth.user?.user_id === userID) {
        console.log(auth.user?.user_id, userID);
        setAuthorized(true);
      }
    }
  }, [router.query]);
  if (auth.loading || !authorized) {
    <Flex
      height="60vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Skeleton startColor="pink.500" endColor="orange.500" rounded="lg" />
    </Flex>;
  }

  if (auth.user?.token && authorized) {
    return (
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            // height="60vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading mb={8}>{auth.user.username}'s profile</Heading>

            <Flex
              direction="column"
              bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
              p={12}
              rounded="xl"
              shadow="2xl"
            >
              <FormControl>
                <Heading fontSize="md">Favorite Genre</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="genre"
                  placeholder="genre"
                  variant="filled"
                  {...register("genre")}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>

              <FormControl>
                <Heading fontSize="md">Favorite Artist</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="artist"
                  placeholder="artist"
                  variant="filled"
                  {...register("artist")}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>

              <FormControl>
                <Heading fontSize="md">Favorite Album</Heading>

                <Input
                  mt={2}
                  mb={6}
                  id="album"
                  placeholder="album"
                  variant="filled"
                  {...register("album")}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>

              <FormControl>
                <Heading fontSize="md">Spotify Username</Heading>

                <Input
                  mt={2}
                  mb={6}
                  id="spotify"
                  placeholder="spotify username"
                  variant="filled"
                  {...register("spotify")}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>
              <FormControl>
                <Heading fontSize="md">Last.fm username</Heading>

                <Input
                  mt={2}
                  id="lastfm"
                  placeholder="last.fm username"
                  variant="filled"
                  {...register("lastfm")}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              ></Flex>
              <ButtonGroup spacing="20" mt={10} mb="-6">
                <NextLink
                  href={{
                    pathname: `/profile/${auth.user.user_id}`,
                  }}
                >
                  <Button
                    isLoading={isSubmitting}
                    bg="purple.600"
                    rounded="xl"
                    size="lg"
                    _hover={{ background: "tomato" }}
                  >
                    <Text _hover={{ color: "purple.600" }} color="white">
                      Cancel
                    </Text>
                  </Button>
                </NextLink>

                <Button
                  isLoading={isSubmitting}
                  spinner={<BeatLoader size={8} color="white" />}
                  type="submit"
                  bg="tomato"
                  rounded="xl"
                  size="lg"
                  _hover={{ background: "purple.600" }}
                >
                  <Text _hover={{ color: "tomato" }} color="white">
                    Submit
                  </Text>
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
        </form>
      </Box>
    );
  } else {
    return (
      <Center>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={2}>you may not have permission to see this</Text>
          <Button onClick={() => router.push("/")}>go home</Button>
        </Flex>
      </Center>
    );
  }
}

export default Settings;
