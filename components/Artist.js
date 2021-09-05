import React from "react";
import { Box, Text, Link, Flex, Image } from "@chakra-ui/react";
import { MdStar, MdPeople, MdPlayArrow } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";

function Artist({ artist }) {
  const router = useRouter();

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
          <Link onClick={() => searchSubmit()}>{artistItem.name} </Link>
        </Text>
        {/* </NextLink> */}
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
    </div>
  );
}

export default Artist;
