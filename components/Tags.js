import { Tag, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function Tags({ tag }) {
  console.log(tag);
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
          href={tag.url}
          textDecoration="none"
          _hover={{ color: "purple.600" }}
        >
          {" "}
          {tag.name}
        </Link>
      </Tag>
    </div>
  );
}

export default Tags;
