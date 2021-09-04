import React, { useEffect, useState } from "react";
import Album from "../Album";
import { useAuth } from "../../providers/authProvider";
import { Grid, Box, Heading, Text } from "@chakra-ui/react";

function SavedAlbums() {
  const auth = useAuth();
  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);

  const fetchActions = () => {
    if (auth.userInfo.actions?.listened) {
      let res = auth.userInfo.actions.listened;
      setListened(res);
      //   console.log(listened);
      //   listened.map((x) => console.log(x._id));
    }
    if (auth.userInfo.actions?.wantToListen) {
      let res = auth.userInfo.actions.wantToListen;
      setWantToListen(res);
    }
    if (auth.user.actions?.listening) {
      let res = auth.userInfo.actions.listening;
      setListening(res);
    }
    // console.log(auth.user.actions);
  };

  useEffect(() => {
    if (auth.userInfo) {
      fetchActions();
    }
    if (listened) {
      listened.map((x) => console.log(x._id));
    }
    // console.log(auth.userInfo);
  });

  return (
    <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {listened ? (
          listened.map((x) => (
            <Box d="flex" flexDir="column">
              <Box>
                <Heading>Listened</Heading>
              </Box>
              <Box>
                <Album key={x._id} thing={x} />
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Grid>
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {wantToListen ? (
          wantToListen.map((x) => (
            <Box d="flex" flexDir="column">
              <Box>
                <Heading>Want To Listen</Heading>
              </Box>
              <Box>
                <Album key={x._id} thing={x} />
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Grid>
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {listening ? (
          listening.map((x) => (
            <Box d="flex" flexDir="column">
              <Box>
                <Heading>Listening</Heading>
              </Box>
              <Box>
                <Album key={x._id} thing={x} />
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
}

export default SavedAlbums;
