import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/authProvider";
import { Grid, Box, Heading } from "@chakra-ui/react";
import Album from "../../Album/Album";

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
    <Box w="80%" h="50rem" mx="auto" mt={10}>
      <Heading mb={2}>listening</Heading>
      <Grid gridTemplateColumns={["repeat(5, 1fr)"]} gap={4}>
        {listening ? (
          listening.map((x) => (
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
}

export default Listening;
