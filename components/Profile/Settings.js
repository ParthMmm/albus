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
import { useQuery, useQueryClient, useMutation, Mutation } from "react-query";
import fetchUserInfo from "../../utils/queries/fetchUser";
import { updateInfo } from "../../utils/queries/addActions";
function Settings() {
  const auth = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const queryClient = useQueryClient();

  const { colorMode } = useColorMode();

  const user = useQuery(
    ["fetchUserInfo", auth?.user?.user_id],
    () => fetchUserInfo(auth?.user?.user_id),
    { enabled: !!auth?.user?.user_id }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    updateMutation.mutate(data);
    reset();
    // queryClient.invalidateQueries(["fetchUserInfo", auth.user.user_id]);
  };

  const updateMutation = useMutation(
    (data) => {
      updateInfo(data, auth.user.token);
    },
    {
      onSuccess: () => {
        console.log("mutation succ");
        queryClient.invalidateQueries(["fetchUserInfo", auth.user.user_id]);
        router.push(`/profile/${auth.user.user_id}`);
      },
    }
  );

  useEffect(() => {
    if (router.query.pid) {
      if (auth.user?.user_id === router.query.pid) {
        setAuthorized(true);
      }
    }
    if (user.data?.info) {
      reset({
        genre: user.data.info.genre,
        artist: user.data.info.artist,
        album: user.data.info.album,
        spotify: user.data.info.spotify,
        lastfm: user.data.info.lastfm,
      });
    }
  }, [user.data]);
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
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading mb={8}>
              {" "}
              <Text
                as="span"
                bgGradient="linear(to-l, #FEAC5E, #C779D0,#4BC0C8)"
                bgClip="text"
                _hover={{
                  bgGradient: "linear(to-r, #FEAC5E, #C779D0,#4BC0C8)",
                }}
              >
                {auth.user.username}'s
              </Text>{" "}
              profile
            </Heading>

            <Flex
              direction="column"
              bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
              p={"2.1rem"}
              rounded="xl"
              shadow="2xl"
            >
              <FormControl>
                <Heading fontSize="md">favorite genre</Heading>
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
                <Heading fontSize="md">favorite artist</Heading>
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
                <Heading fontSize="md">favorite album</Heading>

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
                <Heading fontSize="md">spotify username</Heading>

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
                <Heading fontSize="md">last.fm username</Heading>

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
              <ButtonGroup spacing="20" mt={10}>
                <Button
                  isLoading={isSubmitting}
                  bg="purple.600"
                  rounded="xl"
                  size="lg"
                  _hover={{ background: "tomato" }}
                  onClick={() => router.back()}
                >
                  <Text
                    _hover={{ color: "purple.600" }}
                    color="white"
                    fontSize="1rem"
                  >
                    cancel
                  </Text>
                </Button>

                <Button
                  isLoading={isSubmitting}
                  spinner={<BeatLoader size={8} color="white" />}
                  type="submit"
                  bg="tomato"
                  rounded="xl"
                  size="lg"
                  _hover={{ background: "purple.600" }}
                >
                  <Text
                    _hover={{ color: "tomato" }}
                    color="white"
                    fontSize="1rem"
                  >
                    submit
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
