import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import ListenedShelf from "../../../../components/Profile/shelves/Listened";
import { useRouter } from "next/router";
import { useAuth } from "../../../../providers/authProvider";
import { Spinner } from "@chakra-ui/react";

function index() {
  const router = useRouter();

  const queryKey = "pid";
  const queryValue = router.query[queryKey];

  if (!queryValue) {
    return (
      <div>
        <Header />
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <Header />

        <ListenedShelf />
      </div>
    );
  }
}

export default index;
