import { Badge, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function Tags({ tag }) {
  console.log(tag);
  return (
    <div>
      <Badge>{tag.name}</Badge>
    </div>
  );
}

export default Tags;
