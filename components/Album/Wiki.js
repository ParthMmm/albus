import {
  Box,
  Collapse,
  Button,
  Text,
  Center,
  Icon,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { MdShare } from "react-icons/md";
import ShareButton from "./ShareButton";
function Wiki({ summary }) {
  const [show, setShow] = React.useState(false);
  const { colorMode } = useColorMode();

  const handleToggle = () => setShow(!show);
  return (
    <>
      {summary ? (
        <Box color={colorMode === "dark" ? "white" : "black"}>
          <Box d="flex" flexDir="row-reverse" m="4" justifyContent="flex-start">
            {" "}
            <Box pl="2">
              <Button
                fontFamily="Helvetica"
                fontWeight="semibold"
                size="md"
                onClick={handleToggle}
                rounded="xl"
                bg="gray.400"
              >
                <Text _hover={{ color: "tomato" }} fontWeight="semibold">
                  {" "}
                  show {show ? "less" : "more"}
                </Text>
              </Button>
            </Box>
            <ShareButton />
          </Box>
          <Box flexShrink="1" m={2}>
            <Collapse startingHeight="22rem" in={show} rounded="lg">
              <Text
                fontFamily="Helvetica"
                fontSize="xl"
                dangerouslySetInnerHTML={{ __html: summary }}
              ></Text>
            </Collapse>
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
