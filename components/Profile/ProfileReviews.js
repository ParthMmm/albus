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
import ProfileReview from "./ProfileReview";
import { useAlbum } from "../../providers/albumProvider";
import { useAuth } from "../../providers/authProvider";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
function ProfileReviews() {
  const { colorMode } = useColorMode();
  const album = useAlbum();
  const auth = useAuth();
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [page, setPage] = useState(1);
  const [newReview, setNewReview] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  //   useEffect(() => {
  //     album.fetchReviews();
  //   }, [album.album]);

  //   useEffect(() => {
  //     album.fetchReviews();

  //     return () => {
  //       setNewReview(false);
  //     };
  //   }, [newReview]);
  // console.log(auth.reviews);

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

  // console.log(album.numReviews);

  if (auth.reviews) {
    return (
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>reviews</Heading>
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
            {auth.reviews.slice(firstIndex, lastIndex).map((review) => {
              return <ProfileReview review={review} key={review._id} />;
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
          {lastIndex > auth.reviews.length ? (
            <Button visibility="hidden" />
          ) : (
            <Button as={MdNavigateNext} onClick={() => nextPage()} />
          )}
        </Flex>
      </>
    );
  } else {
    return <></>;
  }
}

export default ProfileReviews;
