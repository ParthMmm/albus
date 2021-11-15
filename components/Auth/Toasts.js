import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  Box,
  useColorMode,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import { BeatLoader } from "react-spinners";
import NextLink from "next/link";
function Toasts({ errors, isSubmitSuccessful, isDirty }) {
  const auth = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const id = "authToast";

  //   toastIdRef.current = toast();
  useEffect(() => {
    // console.log(auth.error);
    if (auth.error) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: auth.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        id,
      });
    }
    if (errors.username && errors.username.message) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: errors.username.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (errors.password && errors.password.message) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: errors.password.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (isSubmitSuccessful && !auth.error && auth.message) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: "success! 🎉",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return function cleanup() {
      auth.setError("");
      auth.setMessage("");
    };
  }, [
    auth.error,
    errors?.username?.message,
    errors?.password?.message,
    isSubmitSuccessful,
  ]);

  return <></>;
}

export default Toasts;
