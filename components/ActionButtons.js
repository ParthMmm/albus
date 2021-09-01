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
import { useAlbum } from "../providers/albumProvider";
import { useAction } from "../providers/actionProvider";
import { useAuth } from "../providers/authProvider";
import { MdDone } from "react-icons/md";

function ActionButtons() {
  const album = useAlbum();
  const action = useAction();
  const auth = useAuth();

  const [listened, setListened] = useState(false);
  const [wantToListen, setWantToListen] = useState(false);
  const [listening, setListening] = useState(false);

  const handleClick = () => {
    // console.log(album.albumID);
    action.addListened(album.albumID);
  };

  const checkActions = () => {
    if (
      auth.user.actions?.listened.find((x) => x.mbid === `${album.albumID}`)
    ) {
      setListened(true);
    }
    if (
      auth.user.actions?.wantToListen.find((x) => x.mbid === `${album.albumID}`)
    ) {
      setWantToListen(true);
    }
    if (
      auth.user.actions?.listening.find((x) => x.mbid === `${album.albumID}`)
    ) {
      setListening(true);
    }
  };

  useEffect(() => {
    auth.fetchUser();
    checkActions();
  });
  return (
    <div>
      <Box bg="gray.600" w="80%" mx="auto" mt={1} color="white">
        <Center>
          <ButtonGroup>
            {listened ? (
              <Button
                onClick={() => {
                  handleClick();
                }}
                bg="purple.600"
                _hover={{ background: "purple.600" }}
              >
                <Box as={MdDone} color="tomato" mr={2} />
                Listened
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleClick();
                }}
                bg="tomato"
                _hover={{ background: "purple.600" }}
              >
                Listened
              </Button>
            )}

            <Button bg="tomato" _hover={{ background: "purple.600" }}>
              Want to Listen
            </Button>
            <Button bg="tomato" _hover={{ background: "purple.600" }}>
              Listening
            </Button>
          </ButtonGroup>
        </Center>
      </Box>
    </div>
  );
}

export default ActionButtons;
