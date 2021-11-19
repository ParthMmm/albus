import React, { useState } from "react";
import { Box, Stack, Text, Link, useColorMode, Flex } from "@chakra-ui/react";
import { Rating, RatingView } from "react-simple-star-rating";

function Review() {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };
  return (
    <Box
      d="flex"
      //   alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      // _hover={{ bg: "tomato" }}
      rounded="xl"
    >
      <Box>
        <RatingView ratingValue={2} />

        <Text fontSize="lg">great album!</Text>
        <Text fontSize="sm">
          man what a great album. I love this album! Vocals and guitar are
          great!
        </Text>
      </Box>
      <Flex justifyContent="flex-end">
        {" "}
        <Text color="gray.500">by Parthmmm</Text>
      </Flex>
    </Box>
  );
}

export default Review;
