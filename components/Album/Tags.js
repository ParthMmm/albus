import { Tag, Link } from "@chakra-ui/react";
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
        maxW="120px"
      >
        <Link
          href={tagURL}
          textDecoration="none"
          _hover={{ color: "purple.600" }}
        >
          {" "}
          {tagName}
        </Link>
      </Tag>
    </div>
  );
}

export default Tags;
