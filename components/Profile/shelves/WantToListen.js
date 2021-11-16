import React, { useEffect, useState } from "react";
import { useProfile } from "../../../providers/profileProvider";
import { Grid, Box, Heading, Skeleton } from "@chakra-ui/react";
import Album from "../../Album/Album";
import { useRouter } from "next/router";
import { albumMBIDCheck } from "../../../utils/albumCheck";

function WantToListen() {
  const profile = useProfile();
  const router = useRouter();

  let userID;
  useEffect(() => {
    userID = router.query.pid;
    if (userID) {
      profile.fetchProfileInfo(userID);
    }
  }, [router.query]);

  if (profile.loading) {
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Heading mb={2}>want to listen</Heading>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={3}
          pb={10}
        >
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
  if (!profile.profileInfo) {
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
  if (profile.profileInfo && !profile.loading) {
    let filtered = albumMBIDCheck(profile.profileInfo.actions.wantToListen);
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Heading mb={2}>want to listen</Heading>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={3}
          pb={10}
        >
          {profile.profileInfo.actions.wantToListen ? (
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
