import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  Image,
  Badge,
  Skeleton,
  Tag,
  Stack,
  Link,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";
import { useAuth } from "../../providers/authProvider";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/router";

function ActionButtons() {
  const album = useAlbum();
  const action = useAction();
  const auth = useAuth();
  const router = useRouter();

  const artist = router.query.slug[0];
  const name = router.query.slug[1];
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
    if (auth.user) {
      auth.fetchUser();
    }
    if (!auth.loading) {
      checkActions();
    }

    console.log(listened, wantToListen, listening);
  }, []);
  return (
    <div>
      <Box w="80%" mx="auto" mt={10} color="white">
        <Center>
          {auth.user ? (
            <ButtonGroup>
              {listened ? (
                <Button
                  bg="purple.600"
                  _hover={{ background: "purple.600" }}
                  rounded="xl"
                  size="lg"
                >
                  <Box as={MdDone} color="tomato" mr={2} />
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
                  want To Listen
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
                >
                  <Box as={MdDone} color="tomato" mr={2} />
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
                onClick={() => {
                  router.push("/register");
                }}
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
              >
                Want To Listen
              </Button>

              <Button
                onClick={() => {
                  router.push("/register");
                }}
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
              >
                Listened
              </Button>
              <Button
                onClick={() => {
                  router.push("/register");
                }}
                bg="tomato"
                _hover={{ background: "purple.600" }}
                size="lg"
              >
                Listened
              </Button>
            </ButtonGroup>
          )}
        </Center>
      </Box>
    </div>
  );
}

export default ActionButtons;
