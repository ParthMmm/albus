import {
  Box,
  Collapse,
  Button,
  Text,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

function Wiki({ summary }) {
  const [show, setShow] = React.useState(false);
  const { colorMode } = useColorMode();

  const handleToggle = () => setShow(!show);
  return (
    <>
      {summary ? (
        <Box color={colorMode === "dark" ? "white" : "black"} s>
          <Box flexShrink="1" m={4}>
            <Collapse startingHeight="22rem" in={show} rounded="lg">
              <Text
                fontFamily="Helvetica"
                fontSize="xl"
                dangerouslySetInnerHTML={{ __html: summary }}
              ></Text>
            </Collapse>
            <Box d="flex" flexDir="row-reverse">
              {" "}
              <Button
                fontFamily="Helvetica"
                fontWeight="semibold"
                size="md"
                onClick={handleToggle}
                mt="1rem"
                rounded="xl"
                bg="gray.400"
              >
                <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                  {" "}
                  show {show ? "less" : "more"}
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Center p={10}>
          <Text>no summary </Text>
        </Center>
      )}
    </>
  );
}

export default Wiki;
