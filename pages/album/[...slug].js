import { useRouter } from "next/router";
import React from "react";
import AlbumPage from "../../components/Album/AlbumPage";
import Header from "../../components/Header";

function album() {
  const router = useRouter();
  const { artist, name } = router.query;
  return (
    <div>
      <Header />
      <AlbumPage artist={artist} name={name} />
    </div>
  );
}

export default album;
