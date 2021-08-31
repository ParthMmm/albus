import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Profile from "../../components/Profile";

function profile() {
  const router = useRouter();
  const { artist, name } = router.query;
  return (
    <div>
      <Header />
      <Profile />
    </div>
  );
}

export default profile;
