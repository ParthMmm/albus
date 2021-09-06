import { Tag, Link, Center } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function Tags(tag) {
  console.log(tag.tag);

  const tagName = tag.tag[0];
  const tagURL = tag.tag[1];
  return (
    <div>
      <Tag
        fontSize="md"
        fontWeight="bold"
        bg="purple.600"
        color="white"
        variant="solid"
        p={3}
        rounded="xl"
        _hover={{ bg: "tomato" }}
        textDecoration="none"
        maxW={{ sm: "80px", md: "120" }}
        minW={{ sm: "80px", md: "100px" }}
        d="inline-block"
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
