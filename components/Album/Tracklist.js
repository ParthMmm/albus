import React from "react";
import { Box, Stack, Text, Link, useColorMode } from "@chakra-ui/react";
function Tracklist({ tracks, color }) {
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
      bg={colorMode === "dark" ? "componentBg" : "white"}
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
              key={track.name}
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
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + String(mins).padStart(1, "0") + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
    // return time.toString().replace(/(.{2})$/, ":$1");
  }
}

export default Tracklist;
