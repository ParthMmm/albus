import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Box,
  Flex,
  Grid,
  Skeleton,
  Heading,
  Text,
  Select,
} from "@chakra-ui/react";
import { tagTopAlbumsFetch } from "../../utils/fetch";
import Album from "./Album";
import fetcher from "../../utils/fetcher";
import { genres } from "../../utils/randoms";
import _ from "lodash";
function TopAlbums() {
  let albums = [];
  const [filter, setFilter] = useState("dance");
  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    let x = Math.floor(Math.random() * genres.length);
    setRandomNum(x);
  }, []);
  const { data, error, isValidating } = useSWR(
    tagTopAlbumsFetch + `&tag=${genres[randomNum]}`,
    fetcher
  );

  if (error || isValidating) {
    return (
      <>
        <Heading>
          top{" "}
          <Text
            as="span"
            bgGradient="linear(to-l, #FEAC5E, #C779D0,#4BC0C8)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-r, #FEAC5E, #C779D0,#4BC0C8)",
            }}
          >
            {genres[randomNum]}
          </Text>{" "}
          albums{" "}
        </Heading>

        <Text mb={2}>all time</Text>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap={6}
          mx={-1}
        >
          {_.times(8, () => {
            <Skeleton
              startColor="orange.500"
              endColor="purple.500"
              // height="25rem"
            />;
          })}
        </Grid>
      </>
    );
  }
  if (data) {
    albums = data.albums.album;
    // console.log(albums);
    return (
      <>
        <Heading>
          top{" "}
          <Text
            as="span"
            bgGradient="linear(to-l, #FEAC5E, #C779D0,#4BC0C8)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-r, #FEAC5E, #C779D0,#4BC0C8)",
            }}
          >
            {genres[randomNum]}
          </Text>{" "}
          albums{" "}
        </Heading>

        <Text mb={2}>all time</Text>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap={6}
          mx={-1}
        >
          {albums.map((album) => (
            <Album key={album.name} thing={album} />
          ))}
        </Grid>
      </>
    );
  }
  return <div></div>;
}

export default TopAlbums;
