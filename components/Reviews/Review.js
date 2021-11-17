import React from "react";
import { Box, Stack, Text, Link, useColorMode, Flex } from "@chakra-ui/react";

function Review() {
  return (
    <Box
      d="flex"
      //   alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      _hover={{ bg: "tomato" }}
      rounded="xl"
    >
      <Box>
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
