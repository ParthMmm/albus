import React from "react";
import Header from "../../../../components/Header";
import Listened from "../../../../components/Profile/shelves/Listened";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Header />
      <Listened pid={pid} />
    </div>
  );
}

export default index;
