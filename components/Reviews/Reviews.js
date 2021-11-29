import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  useColorMode,
  Button,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react";
import _ from "lodash";
import Review from "./Review";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import CreateReview from "./CreateReview";
import { useRouter } from "next/router";

function Reviews({ color }) {
  const { colorMode } = useColorMode();
  const album = useAlbum();
  const router = useRouter();
  const action = useAction();

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(album.reviews);
  // console.log(data);
  useEffect(() => {
    album.fetchReviews();
    if (album.reviews) {
      setData(album.reviews);
    }

    return () => {
      action.setReviewCreated(false);
      setFilter("");
    };
  }, [action.reviewCreated]);

  useEffect(() => {
    if (album.reviews) {
      setData(album.reviews);
    }
  }, [album.reviews]);

  const prevPage = () => {
    setFirstIndex(firstIndex - 10);
    setLastIndex(lastIndex - 10);
    setPage(page - 1);
  };

  const nextPage = () => {
    setFirstIndex(firstIndex + 10);
    setLastIndex(lastIndex + 10);
    setPage(page + 1);
  };

  useEffect(() => {
    if (data && filter === "date") {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
        // console.log("1,", b.datePosted - a.datePosted);
        console.log(
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
        // console.log(new Date(b.datePosted).getTime());
      });

      setData(sortByDate);

      console.log(sortByDate);
      return;
    }

    if (data && filter === "datea") {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
        // console.log(new Date(a.datePosted).getTime());
        // console.log(new Date(b.datePosted).getTime());
        console.log(
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
      });
      setData(sortByDate);

      console.log(sortByDate);
      return;
    }

    if (data && filter === "rating") {
      //descending order
      const sortByRating = [...data];
      sortByRating.sort((a, b) => b.rating - a.rating);
      setData(sortByRating);

      // console.log(sortByRating);
      return;
    }

    if (filter === "") {
      setData(album.reviews);
      console.log("aaaaa");
      return;
    }
  }, [filter]);

  if (data) {
    return (
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>reviews</Heading>
          <Flex alignItems="center" justifyContent="space-evenly">
            <Select
              placeholder="sort by"
              variant="filled"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="date">date</option>
              <option value="datea">date a</option>
              <option value="rating">rating</option>
            </Select>
            <CreateReview />
          </Flex>
        </Flex>

        <Box
          mt={1}
          color={colorMode === "dark" ? "white" : "black"}
          border="5px solid"
          borderColor={color}
          borderRadius="sm"
          rounded="xl"
          boxShadow="lg"
          p={5}
          //   w="80%"
          //   mx="auto"
          bg={colorMode === "dark" ? "componentBg" : "white"}
        >
          <Stack spacing={4}>
            {data.slice(firstIndex, lastIndex).map((review) => {
              return <Review review={review} key={review._id} />;
            })}
          </Stack>
        </Box>
        <Flex
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          m={2}
          flexShrink="0"
        >
          {firstIndex === 0 ? (
            <Button visibility="hidden" />
          ) : (
            <Button as={MdNavigateBefore} onClick={() => prevPage()} />
          )}
          <Text as="span">{page}</Text>
          {lastIndex >= album.numReviews ? (
            <Button visibility="hidden" />
          ) : (
            <Button as={MdNavigateNext} onClick={() => nextPage()} />
          )}
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>reviews</Heading>
          <CreateReview />
        </Flex>
        <Box
          mt={1}
          color={colorMode === "dark" ? "white" : "black"}
          border="5px solid"
          borderColor={color}
          borderRadius="sm"
          rounded="xl"
          boxShadow="lg"
          p={5}
          //   w="80%"
          //   mx="auto"
          d="flex"
          justifyContent="center"
          bg={colorMode === "dark" ? "componentBg" : "white"}
        >
          <Text>write the first review!</Text>
        </Box>
      </>
    );
  }
}

export default Reviews;
