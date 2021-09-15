import { Tag, Link, Center } from "@chakra-ui/react";
import React from "react";

function Tags(tag) {
  const tagName = tag.tag[0];
  const tagURL = tag.tag[1];
  return (
    <div>
      <Tag
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="bold"
        bg="purple.600"
        color="white"
        p={3}
        rounded="xl"
        _hover={{ bg: "tomato" }}
        textDecoration="none"
        maxW={{ base: "100px", md: "140px" }}
        minW={{ base: "60px", md: "100px" }}
        d="flex"
      >
        <Center>
          <Link
            href={tagURL}
            textDecoration="none"
            _hover={{ color: "purple.600" }}
          >
            {" "}
            {tagName}
          </Link>
        </Center>
      </Tag>
    </div>
  );
}

export default Tags;
