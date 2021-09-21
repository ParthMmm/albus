import React, { useState, useEffect } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { MdShare } from "react-icons/md";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast } from "@chakra-ui/react";

function ShareButton() {
  const toast = useToast();

  const [path, setPath] = useState();
  const [copied, setCopied] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    setPath(asPath);
  }, [asPath]);

  return (
    <CopyToClipboard text={path} onCopy={() => setCopied(true)}>
      <Button
        fontFamily="Helvetica"
        fontWeight="semibold"
        size="md"
        rounded="xl"
        bg="gray.400"
        onClick={() =>
          toast({
            title: "Copied to Clipboard",
            status: "success",
            duration: 2000,
            isClosable: true,
            variant: "subtle",
          })
        }
      >
        <Icon as={MdShare} _hover={{ color: "tomato" }} />
      </Button>
    </CopyToClipboard>
  );
}

export default ShareButton;
