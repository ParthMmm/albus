import React from "react";
import { Box, Text, Link, Flex, useColorMode } from "@chakra-ui/react";
import { MdPeople, MdPlayArrow } from "react-icons/md";
import NumberFormat from "react-number-format";
import { colors } from "../../utils/randoms";

function Track({ track }) {
  let trackItem;
  const { colorMode } = useColorMode();
  let randomNum = Math.floor(Math.random() * colors.length);

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
    <Box rounded="xl" shadow="md">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        flexShrink="0"
        p={5}
        h="150"
        borderRadius="sm"
        // border="3px solid"
        // borderColor={colorMode === "dark" ? "purple.300" : "purple.600"}
        // borderColor={colors[randomNum]}
        rounded="xl"
        bg={colorMode === "dark" ? "componentBg" : "white"}
      >
        <Link href={trackItem.url}>
          <Text
            fontWeight="bold"
            lineHeight="normal"
            fontSize="xl"
            display="block"
            _hover={{ color: "tomato" }}
            // color={colorMode === "dark" ? "purple.300" : "purple.600"}
            color={colors[randomNum]}
            noOfLines={[2, 2, 2, 2, 2]}
          >
            {trackItem.name}
          </Text>
        </Link>

        <Link href={trackItem.artistURL}>
          {" "}
          <Text
            fontSize="sm"
            color={{ dark: "white", light: "black" }}
            placeItems="center"
            fontWeight="semibold"
            _hover={{ color: "tomato" }}
          >
            {trackItem.artist}{" "}
          </Text>
        </Link>

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
