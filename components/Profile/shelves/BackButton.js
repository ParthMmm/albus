import React from "react";
import { MdNavigateBefore } from "react-icons/md";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button as={MdNavigateBefore} onClick={() => router.back()}>
        back
      </Button>
    </>
  );
}

export default BackButton;
