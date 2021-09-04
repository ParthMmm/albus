import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/authProvider";
import { Grid, Box, Heading, Text, Link } from "@chakra-ui/react";
import Album from "../../Album";

function Listening({ pid }) {
  const auth = useAuth();

  const [listening, setListening] = useState(null);

  const fetchActions = () => {
    if (auth.userInfo.actions?.listening) {
      let res = auth.userInfo.actions.listening;
      setListening(res.reverse());
    }
  };

  useEffect(() => {
    if (auth.userInfo) {
      fetchActions();
    } else if (pid) {
      auth.fetchUserInfo(pid);
    }
  }, []);
  return (
    <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
      <Heading>Listening</Heading>
      <Grid gridTemplateColumns={["repeat(5, 1fr)"]} gap={4}>
        {listening ? (
          listening.map((x) => (
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

export default Listening;
