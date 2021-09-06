import { Box, Collapse, Button, Text, Center } from "@chakra-ui/react";
import React from "react";

function Wiki({ summary }) {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <>
      {summary ? (
        <Box>
          <Box flexShrink="1" m={4}>
            <Collapse startingHeight="22rem" in={show} rounded="lg">
              <Text
                fontFamily="Helvetica"
                fontSize="xl"
                fontWeight="semibold"
                dangerouslySetInnerHTML={{ __html: summary }}
                color="white"
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
              >
                show {show ? "less" : "more"}
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
