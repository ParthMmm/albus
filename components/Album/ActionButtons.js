import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";
import { useAuth } from "../../providers/authProvider";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import fetchUserInfo from "../../utils/queries/fetchUser";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addListened,
  addWantToListen,
  addListening,
  checkAction,
} from "../../utils/queries/addActions";
import axios from "axios";
function ActionButtons({ name, artist, id }) {
  const album = useAlbum();
  const action = useAction();
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [listened, setListened] = useState(false);
  const [wantToListen, setWantToListen] = useState(false);
  const [listening, setListening] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const albumInfo = { mbid: id, artist: artist, name: name };
  const queryClient = useQueryClient();

  const user = useQuery(
    ["fetchUserInfo", auth.user.user_id],
    () => fetchUserInfo(auth.user.user_id),
    { enabled: !!auth.user.user_id }
  );

  const actions = useQuery(
    ["checkActions", id, auth.user.token],
    () => checkAction(id, auth.user.token),
    { enabled: !!auth.user.token, id }
  );

  // const { res } = axios.get(
  //   `http://localhost:8000/api/user/checkActions?mbid=${id}`,
  //   {
  //     headers: { Authorization: `Bearer ${auth.user.token}` },
  //   }
  // );
  // console.log(res);

  console.log(actions.data);

  const listeningMutation = useMutation(
    (albumInfo) => {
      addListening(albumInfo, auth.user.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchUserInfo", auth.user.user_id]);
        console.log("yoop");
        if (user.isSuccess) {
          checkActions();
        }
      },
    }
  );

  const listenedMutation = useMutation(
    (albumInfo) => {
      addListened(albumInfo, auth.user.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchUserInfo", auth.user.user_id]);
        console.log("yoop2");
        if (user.isSuccess) {
          checkActions();
        }
      },
    }
  );

  const wantToListenMutation = useMutation(
    (albumInfo) => {
      addWantToListen(albumInfo, auth.user.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchUserInfo", auth.user.user_id]);
        console.log("yoop3");
        if (user.isSuccess) {
          console.log("peep");
          checkActions();
        }
      },
    }
  );
  const actionLoading =
    listeningMutation.isLoading ||
    listenedMutation.isLoading ||
    wantToListenMutation.isLoading;

  // console.log(actionLoading);
  // console.log(
  //   listenedMutation.data,
  //   listeningMutation.data,
  //   wantToListenMutation.data
  // );

  // const mutation = useMutation();

  const clickListened = () => {
    if (wantToListen) {
      setWantToListen(false);
      console.log("1");
    }
    if (listening) {
      setListening(false);
      console.log("2");
    }
    if (listened) {
      console.log("3");
      setListened(false);
      listenedMutation.mutate(albumInfo);
      return;
    }

    listenedMutation.mutate(albumInfo);
    setListened(true);
  };

  const clickWantToListen = () => {
    if (listening) {
      setListening(false);
    }
    if (listened) {
      setListened(false);
    }
    if (wantToListen) {
      setWantToListen(false);
      wantToListenMutation.mutate(albumInfo);

      return;
    }

    wantToListenMutation.mutate(albumInfo);
    setWantToListen(true);
  };

  const clickListening = () => {
    if (wantToListen) {
      setWantToListen(false);
      console.log("11");
    }
    if (listened) {
      setListened(false);
      console.log("22");
    }
    if (listening) {
      setListening(false);
      listeningMutation.mutate(albumInfo);

      console.log("33");

      return;
    }
    setListening(true);

    listeningMutation.mutate(albumInfo);
  };

  const checkActions = () => {
    if (!actionLoading) {
      if (
        user.data?.listened?.find((x) => {
          return x.mbid === id || (x.albumName === name && x.artist === artist);
        })
      ) {
        console.log("listened");
        setListened(true);
        setWantToListen(false);
        setListening(false);
        return;
      }
      if (
        user.data?.wantToListen?.find((x) => {
          return x.mbid === id || (x.albumName === name && x.artist === artist);
        })
      ) {
        // console.log("wantToListen");

        setWantToListen(true);
        setListened(false);
        setListening(false);
        return;
      }
      if (
        user.data?.listening?.find((x) => {
          return x.mbid === id || (x.albumName === name && x.artist === artist);
        })
      ) {
        // console.log("listening");

        setListening(true);
        setWantToListen(false);
        setListened(false);
        return;
      }
    }
    console.log(listened, wantToListen, listening);
  };
  // console.log(
  //   "listening",
  //   user.data?.listening?.find((x) => {
  //     return x.mbid === id || (x.albumName === name && x.artist === artist);
  //   })
  // );
  // console.log(
  //   "listened",
  //   user.data?.listened?.find((x) => {
  //     return x.mbid === id || (x.albumName === name && x.artist === artist);
  //   })
  // );
  // console.log(
  //   "wantToListen",
  //   user.data?.wantToListen?.find((x) => {
  //     return x.mbid === id || (x.albumName === name && x.artist === artist);
  //   })
  // );
  // console.log(`${album.albumID}`);
  // console.log(albumInfo);

  // console.log(user.data.listened);
  // console.log(listened, wantToListen, listening);
  // useEffect(() => {
  //   if (router.query.slug) {
  //     artist = router.query.slug[0];
  //     name = router.query.slug[1];
  //   }

  //   // if (!auth.loading && auth.user) {
  //   //   checkActions();
  //   // }
  // }, [user]);
  useEffect(() => {
    checkActions();
  });
  return (
    <div>
      <Box w="80%" mx="auto" mt={10} mb={5} color="white">
        <Box d={{ base: "block", md: "flex" }} justifyContent="center">
          {auth.user ? (
            <Stack direction={["column", "column", "row"]} spacing={3}>
              {listened ? (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickListened();
                  }}
                  bg="purple.600"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                  leftIcon={<MdDone color="tomato" />}
                >
                  listened
                </Button>
              ) : (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickListened();
                  }}
                  bg="tomato"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                >
                  <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                    listened
                  </Text>{" "}
                </Button>
              )}

              {wantToListen ? (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickWantToListen();
                  }}
                  bg="purple.600"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                  leftIcon={<MdDone color="tomato" />}
                >
                  want to listen
                </Button>
              ) : (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickWantToListen();
                  }}
                  bg="tomato"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                >
                  <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                    want to listen
                  </Text>
                </Button>
              )}
              {listening ? (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickListening();
                  }}
                  bg="purple.600"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                  leftIcon={<MdDone color="tomato" />}
                >
                  listening
                </Button>
              ) : (
                <Button
                  isLoading={actionLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  onClick={() => {
                    clickListening();
                  }}
                  bg="tomato"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                >
                  <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                    listening
                  </Text>
                </Button>
              )}
            </Stack>
          ) : (
            <Stack direction={["column", "column", "row"]} spacing={3}>
              <Button
                onClick={() =>
                  toast({
                    title: "Authorization needed",
                    description: "Log in or sign up for an account",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                  })
                }
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
                rounded="xl"
              >
                <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                  listened
                </Text>
              </Button>

              <Button
                onClick={() =>
                  toast({
                    title: "Authorization needed",
                    description: "Log in or sign up for an account",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                  })
                }
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
                rounded="xl"
              >
                <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                  want to listen
                </Text>
              </Button>
              <Button
                onClick={() =>
                  toast({
                    title: "Authorization needed",
                    description: "Log in or sign up for an account",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                  })
                }
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
                rounded="xl"
              >
                <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                  listening
                </Text>
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ActionButtons;
