import React from "react";
import Header from "../../../../components/Header";
import WantToListen from "../../../../components/Profile/shelves/WantToListen";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Header />
      <WantToListen pid={pid} />
    </div>
  );
}

export default index;
