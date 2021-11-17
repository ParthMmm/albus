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
import React, { useRef, useState, useEffect } from "react";
import { MdShare, MdExpandLess } from "react-icons/md";
import ShareButton from "./ShareButton";
function Wiki({ summary }) {
  const [show, setShow] = useState(false);
  const { colorMode } = useColorMode();
  const box = useRef(null);

  const handleToggle = (flag) => {
    setShow(!show);
    if (flag) {
      // box.current.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({ top: 100, behavior: "smooth" });
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
            <Collapse startingHeight="21rem" in={show} rounded="lg">
              <Text
                fontFamily="Helvetica"
                fontSize={["md", "md", "lg", "xl"]}
                dangerouslySetInnerHTML={{ __html: summary }}
              >
                {/* {summary} */}
              </Text>
            </Collapse>
          </Box>
          {show ? (
            <Box p={2}>
              <Button
                as={MdExpandLess}
                float="right"
                bg="none"
                // pr={2}
                // pb={2}
                onClick={() => handleToggle(true)}
              />
            </Box>
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
