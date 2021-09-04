import React from "react";
import Header from "../../../../components/Header";
import Listening from "../../../../components/Profile/shelves/Listening";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Header />
      <Listening pid={pid} />
    </div>
  );
}

export default index;
