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

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import CreateReview from "./CreateReview";

function Reviews({ data, color }) {
  const { colorMode } = useColorMode();

  if (data) {
    return (
      <>
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
            {data.map((review) => {
              return (
                <Review review={review} key={review._id} profile={false} />
              );
            })}
          </Stack>
        </Box>
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
