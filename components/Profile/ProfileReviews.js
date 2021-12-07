import React, { useEffect, useState, useRef } from "react";
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
import { useAlbum } from "../../providers/albumProvider";
import { useAuth } from "../../providers/authProvider";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useProfile } from "../../providers/profileProvider";
import Review from "../Reviews/Review";

function ProfileReviews({ reviews }) {
  const { colorMode } = useColorMode();
  const album = useAlbum();
  const auth = useAuth();
  const profile = useProfile();
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [page, setPage] = useState(1);
  const [newReview, setNewReview] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [filter, setFilter] = useState("");

  const [data, setData] = useState(reviews.data);

  const reviewRef = useRef(null);

  const executeScroll = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });

  const dataCopy = reviews.data;

  useEffect(() => {
    setData(dataCopy);
  }, [reviews.data]);

  const prevPage = () => {
    setFirstIndex(firstIndex - 5);
    setLastIndex(lastIndex - 5);
    setPage(page - 1);
  };

  const nextPage = () => {
    setFirstIndex(firstIndex + 5);
    setLastIndex(lastIndex + 5);
    setPage(page + 1);
  };

  useEffect(() => {
    if (data && filter === "newest") {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
      });

      setData(sortByDate);
      return;
    }

    if (data && filter === "oldest") {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
      });
      setData(sortByDate);
      return;
    }

    if (data && filter === "rating") {
      //descending order
      const sortByRating = [...data];
      sortByRating.sort((a, b) => b.rating - a.rating);
      setData(sortByRating);

      return;
    }

    if (filter === "") {
      setData(dataCopy);

      return;
    }
  }, [filter]);

  if (data) {
    return (
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading ref={reviewRef}>reviews</Heading>
          <Flex>
            <Select
              placeholder="sort by"
              variant="filled"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              bg="none"
              _hover={{ color: "purple.600" }}
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="rating">rating</option>
            </Select>
          </Flex>
          {/* <CreateReview setNewReview={setNewReview} /> */}
        </Flex>

        <Box
          mt={1}
          color={colorMode === "dark" ? "white" : "black"}
          border="5px solid"
          borderColor="purple.600"
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
              return <Review review={review} key={review._id} profile={true} />;
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
            <Button
              as={MdNavigateBefore}
              onClick={() => {
                prevPage();
                executeScroll(reviewRef);
              }}
            />
          )}
          <Text as="span">{page}</Text>
          {lastIndex >= data.length ? (
            <Button visibility="hidden" />
          ) : (
            <Button
              as={MdNavigateNext}
              onClick={() => {
                nextPage();
                executeScroll(reviewRef);
              }}
            />
          )}
        </Flex>
      </>
    );
  } else {
    return <></>;
  }
}

export default ProfileReviews;
