import {
  Flex,
  Button,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";
import home from "./home";

const IndexPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return <home></home>;
};

export default IndexPage;
