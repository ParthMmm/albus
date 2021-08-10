import React from "react";
import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import NextLink from "next/link";

function Header() {
  return (
    <div>
      <Flex
        bg="tomato"
        w="100%"
        h="12vh"
        p={4}
        color="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex pl={5}>
          <NextLink href="/">
            <Heading
              fontSize={{ base: "24px", md: "48px" }}
              _hover={{ color: "purple.600" }}
            >
              albus
            </Heading>
          </NextLink>
        </Flex>
        <Flex justifyContent="center" w="50%" pt={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="purple.600" />}
            />
            <Input
              rounded="2xl"
              focusBorderColor="purple.600"
              placeholder="Search for an album"
              _placeholder={{ color: "gray.200" }}
            ></Input>
          </InputGroup>
        </Flex>
        <Flex justifyContent="space-between">
          <ButtonGroup>
            <NextLink href="/" passHref>
              <Button as="a" bg="none" _hover={{ bg: "purple.600" }}>
                Login
              </Button>
            </NextLink>

            <NextLink href="/" passHref>
              <Button as="a" bg="purple.600" _hover={{ bg: "purple.800" }}>
                Sign Up
              </Button>
            </NextLink>
          </ButtonGroup>
        </Flex>
      </Flex>
    </div>
  );
}

export default Header;
