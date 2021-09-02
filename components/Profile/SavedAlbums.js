import React, { useEffect, useState } from "react";
import Album from "../Album";
import { useAuth } from "../../providers/authProvider";
import { Grid } from "@chakra-ui/react";

function SavedAlbums() {
  const auth = useAuth();
  const [listened, setListened] = useState(null);
  //   const [wantToListen, setWantToListen] = useState(null);
  //   const [listening, setListening] = useState(null);

  let wantToListen, listening;

  const fetchActions = () => {
    if (auth.user.actions?.listened) {
      let tmp = auth.user.actions.listened;
      setListened(tmp);
      //   console.log(listened);
      //   listened.map((x) => console.log(x._id));
    }
    if (auth.user.actions?.wantToListen) {
      wantToListen = auth.user.actions.wantToListen;
    }
    if (auth.user.actions?.listening) {
      listening = auth.user.actions.listening;
    }
    // console.log(auth.user.actions);
  };

  useEffect(() => {
    fetchActions();
    if (listened) {
      listened.map((x) => console.log(x._id));
    }
  });

  return (
    <div>
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={3}
      >
        {listened ? (
          listened.map((x) => <Album key={x._id} thing={x} />)
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
}

export default SavedAlbums;
