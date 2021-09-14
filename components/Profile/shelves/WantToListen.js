import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/authProvider";
import { Grid, Box, Heading, Skeleton } from "@chakra-ui/react";
import Album from "../../Album/Album";
import { useRouter } from "next/router";
import { albumMBIDCheck } from "../../../utils/albumCheck";

function WantToListen() {
  const auth = useAuth();
  const router = useRouter();

  let userID;
  useEffect(() => {
    userID = router.query.pid;
    console.log(userID);
    if (userID) {
      auth.fetchUserInfo(userID);
    }
  }, [router.query]);

  if (auth.loading) {
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Heading mb={2}>want to listen</Heading>
        <Grid gridTemplateColumns={["repeat(4, 1fr)"]} gap={3}>
          {[...Array(12)].map((_, i) => (
            <Skeleton
              startColor="orange.500"
              endColor="purple.500"
              height="25rem"
              key={i}
            />
          ))}
        </Grid>
      </Box>
    );
  }
  if (!auth.userInfo) {
    return (
      <Box>
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
        />
      </Box>
    );
  }
  if (auth.userInfo && !auth.loading) {
    let filtered = albumMBIDCheck(auth.userInfo.actions.wantToListen);
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Heading mb={2}>want to listen</Heading>
        <Grid gridTemplateColumns={["repeat(4, 1fr)"]} gap={3}>
          {auth.userInfo.actions.wantToListen ? (
            filtered.map((x) => (
              <Box>
                <Album key={x._id} thing={x} />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box>
        else
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
        />
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
        />
      </Box>
    );
  }
}

export default WantToListen;
