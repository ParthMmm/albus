import React from "react";
import { Box, Text, Link, Flex, Image } from "@chakra-ui/react";
import { MdStar, MdPeople, MdPlayArrow } from "react-icons/md";
import NumberFormat from "react-number-format";

function Track({ track }) {
  let trackItem;

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
  console.log(trackItem);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        flexShrink="0"
        p={5}
        minHeight={{ sm: "100px", md: "120" }}
        bg="gray.600"
        rounded="lg"
        shadow="md"
      >
        {" "}
        <Text
          fontWeight="bold"
          lineHeight="normal"
          fontSize="xl"
          display="block"
          color="purple.300"
          _hover={{ color: "tomato" }}
        >
          {" "}
          <Link href={trackItem.url}>{trackItem.name}</Link>
        </Text>
        <Text
          fontSize="sm"
          color="white"
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
    </div>
  );
}

export default Track;
