import React from "react";
import { Box, Stack, Text, Link, useColorMode } from "@chakra-ui/react";
function Tracklist({ tracks }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      mt={1}
      color={colorMode === "dark" ? "white" : "black"}
      border="5px solid"
      borderColor="purple.600"
      borderRadius="sm"
      rounded="xl"
      boxShadow="lg"
      p={5}
      w="80%"
      mx="auto"
    >
      <Stack spacing={4}>
        {tracks.map((track) => {
          return (
            <Box
              d="flex"
              alignItems="baseline"
              flexDir="row"
              justifyContent="space-between"
              _hover={{ bg: "tomato" }}
              rounded="xl"
              p={2}
            >
              <Box>
                <Text as="span" fontSize="lg">
                  <b>{track["@attr"].rank}.</b>
                </Text>
                <Text
                  as="span"
                  fontSize="lg"
                  fontWeight="semibold"
                  _hover={{ color: "purple.600" }}
                >
                  <Link ml={2} fontSize="md" href={track.url}>
                    {track.name}
                  </Link>
                </Text>
              </Box>

              <Text>{convertTime(track.duration)}</Text>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

function convertTime(time) {
  if (time) {
    return time.toString().replace(/(.{2})$/, ":$1");
  }
}

export default Tracklist;
