import React from "react";
import Header from "../../../../components/Header";
import Listening from "../../../../components/Profile/shelves/Listening";
import { useRouter } from "next/router";
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
        <Listening />
      </div>
    );
  }
}

export default index;
