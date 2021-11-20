import React, { useEffect } from "react";
import { Box, Stack, Text, Link, useColorMode } from "@chakra-ui/react";
import Review from "./Review";
import { useAlbum } from "../../providers/albumProvider";

function Reviews({ color }) {
  const { colorMode } = useColorMode();
  const album = useAlbum();

  useEffect(() => {
    album.fetchReviews();
  }, [album.album]);

  useEffect(() => {
    album.fetchReviews();
  }, [album.reviews]);

  if (album.reviews) {
    return (
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
          {album?.reviews.map((review) => {
            return <Review review={review} key={review._id} />;
          })}
        </Stack>
      </Box>
    );
  } else {
    return <p>loading</p>;
  }
}

export default Reviews;
