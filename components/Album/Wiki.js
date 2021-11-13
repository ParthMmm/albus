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
import React, { useRef } from "react";
import { MdShare, MdExpandLess } from "react-icons/md";
import ShareButton from "./ShareButton";
function Wiki({ summary }) {
  const [show, setShow] = React.useState(false);
  const { colorMode } = useColorMode();
  const box = useRef(null);

  const handleToggle = (flag) => {
    setShow(!show);
    if (flag) {
      // box.current.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {summary ? (
        <Box color={colorMode === "dark" ? "white" : "black"}>
          <Box d="flex" flexDir="row-reverse" m="4" justifyContent="flex-start">
            {" "}
            <Box pl="2" ref={box}>
              <Button
                fontFamily="Helvetica"
                fontWeight="semibold"
                size="md"
                onClick={() => handleToggle()}
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
                // noOfLines={10}
              ></Text>
            </Collapse>
          </Box>
          {show ? (
            <Button
              as={MdExpandLess}
              float="right"
              bg="none"
              pr={2}
              pb={2}
              onClick={() => handleToggle(true)}
            />
          ) : (
            <> </>
          )}
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
