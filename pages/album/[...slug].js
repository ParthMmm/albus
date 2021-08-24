import { useRouter } from "next/router";
import React from "react";
import AlbumPage from "../../components/AlbumPage";

export async function getStaticProps(context) {
  console.log(context.params); // return { title: 'Mortal Kombat' }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

function album() {
  const router = useRouter();
  const { artist, name } = router.query;
  return (
    <div>
      <AlbumPage artist={artist} name={name} />
    </div>
  );
}

export default album;
