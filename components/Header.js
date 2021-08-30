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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../providers/authProvider";
import { RiAccountCircleLine } from "react-icons/ri";
import NextLink from "next/link";

function Header() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.user);
  });

  return (
    //   <Flex
    //     bg="tomato"
    //     w="100%"
    //     h="12vh"
    //     p={10}
    //     color="white"
    //     alignItems="center"
    //     justifyContent="space-between"
    //   >
    //     <Flex pl={5}>
    //       <NextLink href="/">
    //         <Heading
    //           fontSize={{ base: "24px", md: "48px" }}
    //           _hover={{ color: "purple.600" }}
    //         >
    //           albus
    //         </Heading>
    //       </NextLink>
    //     </Flex>
    //     <Flex justifyContent="center" w="50%" pt={2}>
    //       <InputGroup>
    //         <InputLeftElement
    //           pointerEvents="none"
    //           children={<SearchIcon color="purple.600" />}
    //         />
    //         <Input
    //           rounded="2xl"
    //           focusBorderColor="purple.600"
    //           placeholder="Search for an album"
    //           _placeholder={{ color: "gray.200" }}
    //         ></Input>
    //       </InputGroup>
    //     </Flex>
    //     <Flex justifyContent="end">
    //       {auth.user ? (
    //         <Menu>
    //           <MenuButton
    //             as={IconButton}
    //             icon={<RiAccountCircleLine />}
    //             color="purple.600"
    //             bg="0"
    //           >
    //             <MenuList>
    //               <MenuItem>Profile</MenuItem>
    //               <MenuItem>Profile</MenuItem>
    //               <MenuItem>Log Out</MenuItem>
    //             </MenuList>
    //           </MenuButton>
    //         </Menu>
    //       ) : (
    //         <ButtonGroup>
    //           <NextLink href="/login" passHref>
    //             <Button as="a" bg="none" _hover={{ bg: "purple.600" }}>
    //               Login
    //             </Button>
    //           </NextLink>

    //           <NextLink href="/register" passHref>
    //             <Button as="a" bg="purple.600" _hover={{ bg: "purple.800" }}>
    //               Sign Up
    //             </Button>
    //           </NextLink>
    //         </ButtonGroup>
    //       )}
    //     </Flex>
    //   </Flex>
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
        <Flex
          justifyContent="center"
          alignItems="center"
          w="5xl"
          mx={{ base: "0", md: 10 }}
        >
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
                <MenuItem>Profile</MenuItem>
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
