import React from "react";
import { Box, Text, Link, Flex, useColorMode } from "@chakra-ui/react";
import { MdPeople, MdPlayArrow } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";

function Artist({ artist }) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  let artistItem;
  if (artist) {
    artistItem = {
      name: artist.name,
      url: artist.url,
      listeners: artist.listeners,
      playcount: artist.playcount,
      imageUrl: artist.image[2]["#text"],
    };
  }
  const searchSubmit = () => {
    router.push({
      pathname: "/search",
      query: { input: artist.name },
    });
  };
  return (
    <Box rounded="xl" shadow="md">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        flexShrink="0"
        p={5}
        h="120"
        bg={{ dark: "gray.600", light: "0" }}
        borderRadius="sm"
        border="3px solid"
        borderColor={colorMode === "dark" ? "purple.300" : "purple.600"}
        rounded="xl"
      >
        {" "}
        <Text
          fontWeight="bold"
          lineHeight="normal"
          fontSize="xl"
          display="block"
          color={colorMode === "dark" ? "purple.300" : "purple.600"}
          _hover={{ color: "tomato" }}
        >
          {" "}
          <Link onClick={() => searchSubmit()}>{artistItem.name} </Link>
        </Text>
        <Flex mt={2} align="center">
          <Box as={MdPlayArrow} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>
              <NumberFormat
                value={artist.playcount}
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
                value={artist.listeners}
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

export default Artist;
