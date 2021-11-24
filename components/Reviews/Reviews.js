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
} from "@chakra-ui/react";
import _ from "lodash";
import Review from "./Review";
import { useAlbum } from "../../providers/albumProvider";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import CreateReview from "./CreateReview";
function Reviews({ color }) {
  const { colorMode } = useColorMode();
  const album = useAlbum();

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [page, setPage] = useState(1);
  const [newReview, setNewReview] = useState(false);

  useEffect(() => {
    album.fetchReviews();
  }, [album.album]);

  useEffect(() => {
    album.fetchReviews();

    return () => {
      setNewReview(false);
    };
  }, [newReview]);

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

  if (album.reviews) {
    return (
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>reviews</Heading>
          <CreateReview setNewReview={setNewReview} />
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
            {album?.reviews.slice(firstIndex, lastIndex).map((review) => {
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
          {lastIndex > album.numReviews ? (
            <Button visibility="hidden" />
          ) : (
            <Button as={MdNavigateNext} onClick={() => nextPage()} />
          )}
        </Flex>
      </>
    );
  } else {
    return (
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>reviews</Heading>
        <CreateReview />
      </Flex>
    );
  }
}

export default Reviews;
