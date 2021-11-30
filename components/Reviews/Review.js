import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Stack,
  Text,
  Link,
  useColorMode,
  Flex,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { RatingView } from "react-simple-star-rating";
import NextLink from "next/link";
import Moment from "react-moment";
import "moment-timezone";
import { MdShare, MdExpandLess, MdExpandMore } from "react-icons/md";

function Review({ review, profile }) {
  const { colorMode } = useColorMode();
  const [show, setShow] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [numLines, setNumLines] = useState(6);
  // let wordCount = 0;
  const titleRef = useRef(null);

  const executeScroll = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    // wordCount = countWords(review.reviewBody);
    setWordCount(countWords(review.reviewBody));
    console.log(wordCount);
    console.log(numLines);
  }, [review]);

  const handleToggle = () => {
    setShow(!show);

    // setTimeout(() => {
    //   show ? setNumLines(6) : setNumLines("none");
    // }, 100);
    show
      ? setTimeout(() => {
          setNumLines(6);
        }, 100)
      : setNumLines("none");
  };
  // wordCount > 80 ? setNumLines(6) : setNumLines("none");

  return (
    <Box d="flex" flexDir="column" justifyContent="space-between" rounded="xl">
      <Box>
        <Flex flexDirection="column" ref={titleRef}>
          {profile ? (
            <NextLink
              href={{
                pathname: `/album/[...slug]`,
                query: {
                  artist: review.album.artist,
                  name: review.album.albumName,
                },
              }}
              as={`/album/${review.album.artist}/${encodeURIComponent(
                review.album.albumName
              )}`}
            >
              <Text fontWeight="bold">
                <Link
                  href=""
                  textDecoration="none"
                  _hover={{ color: "tomato" }}
                >
                  {review.album.artist} - {review.album.albumName}
                </Link>
              </Text>
            </NextLink>
          ) : (
            <> </>
          )}
          <RatingView ratingValue={review.rating} size="1.1rem" />
        </Flex>

        <Text fontSize="xl" fontWeight="bold" as="span">
          {review.title}
        </Text>

        {wordCount < 80 ? (
          <Text fontSize="md" mt={2} mb={2}>
            {review.reviewBody}
          </Text>
        ) : (
          <Box>
            <Collapse startingHeight={150} in={show} animateOpacity>
              {" "}
              <Text fontSize="md" mt={2} noOfLines={numLines}>
                {review.reviewBody}
              </Text>
            </Collapse>
            <Button
              as={show ? MdExpandLess : MdExpandMore}
              size="sm"
              mt="1rem"
              float="right"
              bg="none"
              _hover={{ color: "tomato" }}
              onClick={() => {
                handleToggle();
                executeScroll(titleRef);
              }}
            ></Button>{" "}
          </Box>
        )}
      </Box>
      <Box>
        <NextLink
          href={{
            pathname: `/profile/${review.user._id}/`,
            query: {
              pid: review.user._id,
            },
          }}
          as={`/profile/${review.user._id}`}
        >
          <Text
            fontSize=".9rem"
            color={colorMode === "dark" ? "gray.400" : "gray.700"}
          >
            by{" "}
            <Link href="" textDecoration="none" _hover={{ color: "tomato" }}>
              {review.user.username}
            </Link>
          </Text>
        </NextLink>
        <Text
          fontSize=".7rem"
          color={colorMode === "dark" ? "gray.500" : "gray.800"}
        >
          <Moment
            local
            date={review.datePosted}
            format="MMM DD, YYYY hh:mm A"
          />
        </Text>
      </Box>
    </Box>
  );
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

export default Review;
