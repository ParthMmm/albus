import React, { useEffect, useState } from "react";
import Album from "../Album/Album";
import { useAuth } from "../../providers/authProvider";
import { Grid, Box, Heading, Text, Link, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import albumCheck from "../../utils/albumCheck";
function SavedAlbums({ profile }) {
  const auth = useAuth();

  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);

  const fetchActions = () => {
    if (profile.actions?.listened) {
      let res = profile.actions.listened;
      if (res.length > 0) {
        const reversed = res.reverse();
        setListened(reversed);
      }
    }
    if (profile.actions?.wantToListen) {
      let res = profile.actions.wantToListen;
      if (res.length > 0) {
        const reversed = res.reverse();
        setWantToListen(reversed);
      }
    }
    if (profile.actions?.listening) {
      let res = profile.actions.listening;
      if (res.length > 0) {
        const reversed = res.reverse();

        setListening(reversed);
      }
    }
  };

  useEffect(() => {
    if (profile) {
      fetchActions();
    }
  });

  return (
    <Box w="80%" h="40rem" mx="auto" color={{ dark: "white", light: "black" }}>
      {listening ? (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="baseline"
          flexDir="row"
          mt={2}
        >
          <Box>
            <Heading mb={2}>listening</Heading>
          </Box>
          <Box>
            {listening.length > 4 ? (
              <NextLink
                href={{
                  pathname: `/profile/${profile.user_id}/listening`,
                }}
              >
                <Link _hover={{ color: "purple.300" }}> show all</Link>
              </NextLink>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gridTemplateRows={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={3}
      >
        {listening ? (
          listening.slice(0, 4).map((x) => <Album key={x._id} thing={x} />)
        ) : (
          <></>
        )}
      </Grid>
      {listened ? (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="baseline"
          flexDir="row"
          mt={2}
        >
          <Box>
            <Heading mb={2}>listened</Heading>
          </Box>
          <Box>
            {listened.length > 4 ? (
              <NextLink
                href={{
                  pathname: `/profile/${profile.user_id}/listened`,
                }}
              >
                <Link _hover={{ color: "purple.300" }}> show all</Link>
              </NextLink>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gridTemplateRows={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={3}
      >
        {listened ? (
          listened.slice(0, 4).map((x) => <Album key={x._id} thing={x} />)
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
          mt={2}
        >
          <Box>
            <Heading mb={2} mt={2}>
              want to listen
            </Heading>
          </Box>
          <Box>
            {wantToListen.length > 4 ? (
              <NextLink
                href={{
                  pathname: `/profile/${profile.user_id}/wantToListen`,
                }}
              >
                <Link _hover={{ color: "purple.300" }}> show all</Link>
              </NextLink>
            ) : (
              <> </>
            )}
          </Box>
        </Box>
      ) : (
        <> </>
      )}
      <Grid
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gridTemplateRows={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={3}
        pb={10}
      >
        {wantToListen ? (
          wantToListen.slice(0, 4).map((x) => <Album key={x._id} thing={x} />)
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
}

export default SavedAlbums;
