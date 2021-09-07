import React from "react";
import { Box, Text, Link, Flex, useColorMode } from "@chakra-ui/react";
import { MdPeople, MdPlayArrow } from "react-icons/md";
import NumberFormat from "react-number-format";

function Track({ track }) {
  let trackItem;
  const { colorMode } = useColorMode();

  if (track) {
    trackItem = {
      name: track.name,
      url: track.url,
      listeners: track.listeners,
      playcount: track.playcount,
      artist: track.artist.name,
      artistURL: track.artist.url,
    };
  }
  return (
    <Box shadow="xl">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        flexShrink="0"
        p={5}
        minHeight={{ sm: "100px", md: "120" }}
        bg={{ dark: "gray.600", light: "white" }}
        borderRadius="sm"
        border="2px solid"
        borderColor={colorMode === "dark" ? "purple.300" : "purple.600"}
        rounded="xl"
      >
        {" "}
        <Text
          fontWeight="bold"
          lineHeight="normal"
          fontSize="xl"
          display="block"
          _hover={{ color: "tomato" }}
          color={colorMode === "dark" ? "purple.300" : "purple.600"}
        >
          {" "}
          <Link href={trackItem.url}>{trackItem.name}</Link>
        </Text>
        <Text
          fontSize="sm"
          color={{ dark: "white", light: "black" }}
          placeItems="center"
          fontWeight="semibold"
          _hover={{ color: "tomato" }}
        >
          <Link href={trackItem.artistURL}> {trackItem.artist}</Link>
        </Text>
        {/* </NextLink> */}
        <Flex mt={2} align="center">
          <Box as={MdPlayArrow} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>
              <NumberFormat
                value={trackItem.playcount}
                displayType="text"
                thousandSeparator={true}
              />
            </b>
          </Text>
        </Flex>
        <Flex mt={2} align="center">
          <Box as={MdPeople} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>
              <NumberFormat
                value={trackItem.listeners}
                displayType="text"
                thousandSeparator={true}
              />
            </b>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Track;
