import React, { useState } from "react";
import { Box, Stack, Text, Link, useColorMode, Flex } from "@chakra-ui/react";
import { RatingView } from "react-simple-star-rating";

function Review({ review }) {
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
        <RatingView ratingValue={review.rating} />

        <Text fontSize="lg">{review.title}</Text>
        <Text fontSize="sm">{review.reviewBody}</Text>
      </Box>
      <Flex justifyContent="flex-end">
        {" "}
        <Text color="gray.500">by {review.user.username}</Text>
      </Flex>
    </Box>
  );
}

export default Review;
