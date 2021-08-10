import {
  Flex,
  Button,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";

const IndexPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="!!!@!!!"
          variant="filled"
          mb={3}
          type="email"
        ></Input>
        <Input
          placeholder="******"
          variant="filled"
          mb={6}
          type="password"
        ></Input>

        <Link href="/landing">
          <Button mb={6} colorScheme="teal">
            Log In
          </Button>
        </Link>
        <Button onClick={toggleColorMode}>Toggle Color</Button>
      </Flex>
    </Flex>
  );
};

export default IndexPage;
