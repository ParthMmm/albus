import React, { useEffect, useState } from "react";
import { useProfile } from "../../../providers/profileProvider";
import { Grid, Box, Heading, Skeleton, Flex } from "@chakra-ui/react";
import Album from "../../Album/Album";
import { useRouter } from "next/router";
import { albumMBIDCheck } from "../../../utils/albumCheck";
import BackButton from "./BackButton";
import { useQuery, useQueryClient } from "react-query";
import fetchUserInfo from "../../../utils/queries/fetchUser";
function WantToListen() {
  const router = useRouter();

  const profile = useQuery(
    ["fetchUserInfo", router.query.pid],
    () => fetchUserInfo(router.query.pid),
    { enabled: !!router.query.pid }
  );

  // console.log(profile);
  if (profile.isLoading) {
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Heading mb={2}>want to listen</Heading>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
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
  if (!profile.data) {
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
  if (profile.data && !profile.isLoading) {
    let filtered = albumMBIDCheck(profile.data.wantToListen);
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Flex justifyContent="space-between" alignItems="center">
          {" "}
          <Heading mb={2}>{profile.data.username}'s want to listen</Heading>
          <BackButton />
        </Flex>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={3}
          pb={10}
        >
          {profile.data.wantToListen ? (
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
