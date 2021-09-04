import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/authProvider";
import { Grid, Box, Heading, Text, Link, Spinner } from "@chakra-ui/react";
import Album from "../../Album";

function WantToListen({ pid }) {
  const auth = useAuth();

  const [wantToListen, setWantTolisten] = useState(null);

  const fetchActions = () => {
    if (auth.userInfo.actions?.wantToListen) {
      let res = auth.userInfo.actions.wantToListen;
      setWantTolisten(res.reverse());
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      fetchActions();
    } else if (pid) {
      auth.fetchUserInfo(pid);
    }
  }, []);
  if (auth.loading) {
    return (
      <div>
        <Spinner bg="tomato" />
      </div>
    );
  } else {
    return (
      <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
        <Heading>Want To Listen</Heading>
        <Grid gridTemplateColumns={["repeat(5, 1fr)"]} gap={4}>
          {wantToListen ? (
            wantToListen.map((x) => (
              <Box d="flex" flexDir="row" justifyContent="space-between">
                <Album key={x._id} thing={x} />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    );
  }
}

export default WantToListen;
