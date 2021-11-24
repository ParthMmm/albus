import React, { useState } from "react";
import { Box, Stack, Text, Link, useColorMode, Flex } from "@chakra-ui/react";
import { RatingView } from "react-simple-star-rating";
import NextLink from "next/link";

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
        <NextLink
          href={{
            pathname: `/profile/${review.user._id}/`,
            query: {
              pid: review.user._id,
            },
          }}
          as={`/profile/${review.user._id}`}
        >
          <Text color="gray.500">
            by <Link>{review.user.username}</Link>
          </Text>
        </NextLink>
      </Flex>
    </Box>
  );
}

export default Review;
