import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/authProvider";
import { Grid, Box, Heading } from "@chakra-ui/react";
import Album from "../../Album/Album";

function Listened({ pid }) {
  const auth = useAuth();

  const [listened, setListened] = useState(null);

  const fetchActions = () => {
    if (auth.userInfo.actions?.listened) {
      let res = auth.userInfo.actions.listened;
      setListened(res.reverse());
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
      <Heading mb={2}>listened</Heading>
      <Grid gridTemplateColumns={["repeat(5, 1fr)"]} gap={4}>
        {listened ? (
          listened.map((x) => (
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

export default Listened;
