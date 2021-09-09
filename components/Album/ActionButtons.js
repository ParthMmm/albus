import React, { useEffect, useState } from "react";
import { Box, Center, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";
import { useAuth } from "../../providers/authProvider";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

function ActionButtons() {
  const album = useAlbum();
  const action = useAction();
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  let artist;
  let name;

  const [listened, setListened] = useState(false);
  const [wantToListen, setWantToListen] = useState(false);
  const [listening, setListening] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const albumInfo = { mbid: album.albumID, artist: artist, name: name };

  const clickListened = () => {
    if (wantToListen) {
      setWantToListen(false);
    }
    if (listening) {
      setListening(false);
    }
    if (listened) {
      return;
    }
    setListened(true);
    action.addListened(albumInfo);
  };

  const clickWantToListen = () => {
    if (listening) {
      setListening(false);
    }
    if (listened) {
      setListened(false);
    }
    if (wantToListen) {
      return;
    }
    setWantToListen(true);
    action.addWantToListen(albumInfo);
  };

  const clickListening = () => {
    if (wantToListen) {
      setWantToListen(false);
    }
    if (listened) {
      setListened(false);
    }
    if (listening) {
      return;
    }
    setListening(true);
    action.addListening(albumInfo);
  };

  const checkActions = () => {
    if (
      auth.user.actions?.listened?.find((x) => x.mbid === `${album.albumID}`)
    ) {
      setListened(true);
      setWantToListen(false);
      setListening(false);
    }
    if (
      auth.user.actions?.wantToListen?.find(
        (x) => x.mbid === `${album.albumID}`
      )
    ) {
      setWantToListen(true);
      setListened(false);
      setListening(false);
    }
    if (
      auth.user.actions?.listening?.find((x) => x.mbid === `${album.albumID}`)
    ) {
      setListening(true);
      setWantToListen(false);
      setListened(false);
    }
  };

  useEffect(() => {
    setListening(false);
    setWantToListen(false);
    setListened(false);
    if (router.query.slug) {
      artist = router.query.slug[0];
      name = router.query.slug[1];
    }

    if (auth.user) {
      auth.fetchUser();
    }
    if (!auth.loading) {
      checkActions();
    }
  }, [router.query]);
  return (
    <div>
      <Box w="80%" mx="auto" mt={10} color="white">
        <Box
          d="flex"
          justifyContent="center"
          flexDir={{ base: "column", sm: "column", md: "row" }}
        >
          {auth.user ? (
            <ButtonGroup>
              {listened ? (
                <Button
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
            </ButtonGroup>
          ) : (
            <ButtonGroup>
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
            </ButtonGroup>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ActionButtons;
