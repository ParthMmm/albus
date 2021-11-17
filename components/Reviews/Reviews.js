import React from "react";
import { Box, Stack, Text, Link, useColorMode } from "@chakra-ui/react";
import Review from "./Review";

function Reviews({ color }) {
  const { colorMode } = useColorMode();

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
        <Review />
      </Stack>
    </Box>
  );
}

export default Reviews;
