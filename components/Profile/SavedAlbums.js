import React, { useEffect, useState } from "react";
import Album from "../Album/Album";
import { useAuth } from "../../providers/authProvider";
import { Grid, Box, Heading, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

function SavedAlbums() {
  const auth = useAuth();
  const router = useRouter();

  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);

  const fetchActions = () => {
    if (auth.userInfo.actions?.listened) {
      let res = auth.userInfo.actions.listened;
      setListened(res.reverse());
    }
    if (auth.userInfo.actions?.wantToListen) {
      let res = auth.userInfo.actions.wantToListen;
      setWantToListen(res.reverse());
    }
    if (auth.user.actions?.listening) {
      let res = auth.userInfo.actions.listening;
      setListening(res.reverse());
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      fetchActions();
    }
  });

  return (
    <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
      {listened ? (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="baseline"
          flexDir="row"
        >
          <Box>
            <Heading>Listened</Heading>
          </Box>
          <Box>
            <NextLink
              href={{
                pathname: `/profile/${auth.userInfo.user_id}/listened`,
              }}
            >
              Show All
            </NextLink>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {listened ? (
          listened.slice(0, 5).map((x) => <Album key={x._id} thing={x} />)
        ) : (
          <></>
        )}
      </Grid>
      {wantToListen ? (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="baseline"
          flexDir="row"
        >
          <Box>
            <Heading>Want To Listen</Heading>
          </Box>
          <Box>
            <NextLink
              href={{
                pathname: `/profile/${auth.userInfo.user_id}/wantToListen`,
              }}
            >
              Show All
            </NextLink>
          </Box>
        </Box>
      ) : (
        <> </>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        <Box>
          {wantToListen ? (
            wantToListen.slice(0, 5).map((x) => <Album key={x._id} thing={x} />)
          ) : (
            <></>
          )}
        </Box>
      </Grid>
      {listening ? (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="baseline"
          flexDir="row"
        >
          <Box>
            <Heading>Listening</Heading>
          </Box>
          <Box>
            <NextLink
              href={{
                pathname: `/profile/${auth.userInfo.user_id}/listening`,
              }}
            >
              Show All
            </NextLink>
          </Box>
        </Box>
      ) : (
        <> </>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {listening ? (
          listening.slice(0, 5).map((x) => <Album key={x._id} thing={x} />)
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
}

export default SavedAlbums;
