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
      console.log(res.length);
      if (res.length > 0) {
        setListened(res.reverse());
      }
    }
    if (auth.userInfo.actions?.wantToListen) {
      let res = auth.userInfo.actions.wantToListen;
      if (res.length > 0) {
        setWantToListen(res.reverse());
      }
    }
    if (auth.user.actions?.listening) {
      let res = auth.userInfo.actions.listening;
      if (res.length > 0) {
        setListening(res.reverse());
      }
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      fetchActions();
    }
  });

  return (
    <Box w="80%" h="40rem" mx="auto" mt={10} color="white">
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
            {listened.length > 5 ? (
              <NextLink
                href={{
                  pathname: `/profile/${auth.userInfo.user_id}/listened`,
                }}
              >
                Show All
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
          mt={2}
        >
          <Box>
            <Heading mb={2} mt={2}>
              want to listen
            </Heading>
          </Box>
          <Box>
            {wantToListen.length > 5 ? (
              <NextLink
                href={{
                  pathname: `/profile/${auth.userInfo.user_id}/wantToListen`,
                }}
              >
                Show All
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
          mt={2}
        >
          <Box>
            <Heading mb={2} mt={2}>
              listening
            </Heading>
          </Box>
          <Box>
            {listening.length > 5 ? (
              <NextLink
                href={{
                  pathname: `/profile/${auth.userInfo.user_id}/listening`,
                }}
              >
                Show All
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
