import React, { useEffect } from "react";
import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../providers/authProvider";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import NextLink from "next/link";
import Search from "./Search/Search";
import { useRouter } from "next/router";

function Header() {
  const auth = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (auth.user) {
      // auth.fetchUserInfo(auth.user.user_id);
    }
  }, []);

  return (
    <Flex
      backgroundColor="tomato"
      mb={[8, 12]}
      w="full"
      borderTop="5px solid"
      borderColor="purple.600"
      roundedBottom="md"
      shadow="md"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="1250px"
        m="0 auto"
        w="full"
        px={5}
        h="12vh"
      >
        <Flex alignItems="center" mr={2}>
          <NextLink href="/">
            <Heading
              fontSize={{ base: "24px", md: "36px", lg: "48px" }}
              _hover={{ color: "purple.600" }}
              color="white"
            >
              <Link href="">albus</Link>
            </Heading>
          </NextLink>
        </Flex>
        <Search />
        <Flex justifyContent="center" alignItems="center" ml={[0, null, 0]}>
          <Button
            id="colorChange"
            as={IconButton}
            icon={colorMode === "dark" ? <IoSunnySharp /> : <IoMoonSharp />}
            onClick={toggleColorMode}
            color="purple.600"
            bg="0"
          />
          {auth.user ? (
            <Menu bg={{ dark: "gray.600", light: "white" }}>
              <MenuButton
                id="profileButton"
                as={IconButton}
                icon={<RiAccountCircleLine />}
                color="purple.600"
                bg="0"
              />
              <MenuList>
                <MenuItem
                  onClick={() => router.push(`/profile/${auth.user.user_id}`)}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    router.push(`/profile/${auth.user.user_id}/settings`)
                  }
                >
                  Settings
                </MenuItem>
                <MenuItem onClick={() => auth.logout()}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              {/* show on mobile */}
              <Menu d={{ base: "flex", sm: "none", md: "none", lg: "none" }}>
                <MenuButton
                  id="hamburgerMenu"
                  as={IconButton}
                  icon={<MdMenu />}
                  color="purple.600"
                  bg="0"
                  size="lg"
                  d={{ sm: "flex", md: "none", lg: "none" }}
                />
                <MenuList bg="gray.600">
                  <NextLink href="/login" passHref>
                    <MenuItem>Login</MenuItem>
                  </NextLink>
                  <NextLink href="/register" passHref>
                    <MenuItem>Sign Up</MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
              {/* don't show on mobile */}
              <ButtonGroup
                d={{ base: "none", sm: "flex", md: "flex", lg: "flex" }}
              >
                <NextLink href="/login" passHref>
                  <Button
                    id="login"
                    as="a"
                    bg="none"
                    _hover={{ bg: "purple.600" }}
                    color="white"
                  >
                    Login
                  </Button>
                </NextLink>

                <NextLink href="/register" passHref>
                  <Button
                    id="signUp"
                    as="a"
                    bg="purple.600"
                    _hover={{ bg: "purple.800" }}
                    color="white"
                  >
                    Sign Up
                  </Button>
                </NextLink>
              </ButtonGroup>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
