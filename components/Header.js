import React, { useEffect } from "react";
import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
  Link,
  FormControl,
} from "@chakra-ui/react";
import { useAuth } from "../providers/authProvider";
import { RiAccountCircleLine } from "react-icons/ri";
import NextLink from "next/link";
import Search from "./Search";
import { useRouter } from "next/router";

function Header() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user) {
      auth.fetchUser();
    }
    // console.log(auth.user);
  });

  return (
    <Flex
      backgroundColor="tomato"
      mb={[8, 12]}
      w="full"
      borderTop="5px solid"
      borderColor="purple.600"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="1250px"
        m="0 auto"
        w="full"
        px={5}
        h="12vh"
        //   border="1px solid red"
      >
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <NextLink href="/home">
            <Heading
              fontSize={{ base: "24px", md: "48px" }}
              _hover={{ color: "purple.600" }}
            >
              <Link>albus</Link>
            </Heading>
          </NextLink>
        </Flex>
        <Search></Search>
        <Flex justifyContent="center" alignItems="center" ml={[4, null, 0]}>
          {auth.user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<RiAccountCircleLine />}
                color="purple.600"
                bg="0"
                size="lg"
              />
              <MenuList bg="gray.600">
                <MenuItem
                  onClick={() => router.push(`/profile/${auth.user.user_id}`)}
                >
                  Profile
                </MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => auth.logout()}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ButtonGroup>
              <NextLink href="/login" passHref>
                <Button as="a" bg="none" _hover={{ bg: "purple.600" }}>
                  Login
                </Button>
              </NextLink>

              <NextLink href="/register" passHref>
                <Button as="a" bg="purple.600" _hover={{ bg: "purple.800" }}>
                  Sign Up
                </Button>
              </NextLink>
            </ButtonGroup>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
