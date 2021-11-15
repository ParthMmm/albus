import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import {
  Box,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  Link,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import { BeatLoader } from "react-spinners";
import NextLink from "next/link";
import Toasts from "./Toasts";

function LogIn() {
  const auth = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const id = "authToast";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, submitCount },
    reset,
    clearErrors,
    control,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const onSubmit = (data) => {
    auth.login(data);
    clearErrors();
    reset();
  };

  // useEffect(() => {
  //   console.log(auth.error);
  //   if (auth.error) {
  //     if (!toast.isActive(id)) {
  //       toastIdRef.current = toast({
  //         description: auth.error,
  //         status: "error",
  //         duration: 10000,
  //         isClosable: true,
  //         id,
  //       });
  //     }
  //   }
  //   if (errors.username && errors.username.message) {
  //     toastIdRef.current = toast({
  //       description: errors.username.message,
  //       status: "error",
  //       duration: 10000,
  //       isClosable: true,
  //     });
  //   }
  //   if (errors.password && errors.password.message) {
  //     toastIdRef.current = toast({
  //       description: errors.password.message,
  //       status: "error",
  //       duration: 10000,
  //       isClosable: true,
  //     });
  //   }
  //   if (isSubmitSuccessful) {
  //     toast.closeAll();
  //   }
  // }, [
  //   auth.error,
  //   errors?.username?.message,
  //   errors?.password?.message,
  //   isSubmitSuccessful,
  // ]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          height="100vh"
          w="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Flex alignItems="center" mr={2} pb={5}>
            <NextLink href="/">
              <Heading
                // fontSize={{ base: "24px", md: "36px", lg: "48px" }}
                _hover={{ color: "purple.600" }}
                color="white"
              >
                <Link
                  bgGradient="linear(to-l, #FEAC5E, #C779D0,#4BC0C8)"
                  bgClip="text"
                  _hover={{
                    bgGradient: "linear(to-r, #FEAC5E, #C779D0,#4BC0C8)",
                  }}
                  fontSize="3rem"
                >
                  albus
                </Link>
              </Heading>
            </NextLink>
          </Flex>
          <Flex
            direction="column"
            p={12}
            rounded="xl"
            shadow="2xl"
            height="45%"
            justifyContent="space-evenly"
            bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
            flexGrow="0"
          >
            <Heading mt={-4}>Log In</Heading>
            <Box>
              <FormControl isInvalid={errors.username}>
                <Input
                  mb={5}
                  id="username"
                  placeholder="username"
                  variant="filled"
                  type="username"
                  {...register("username", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "username must be at least 4 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "username must be at most 12 characters",
                    },
                  })}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <Input
                  mb={5}
                  id="password"
                  placeholder="password"
                  variant="filled"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "password must be at most 20 characters",
                    },
                  })}
                  borderRadius="sm"
                  border={colorMode === "light" ? "2px solid" : "0px"}
                  borderColor="gray.300"
                  focusBorderColor="purple.600"
                  rounded="xl"
                />
              </FormControl>
            </Box>
            <Flex flexDir="column" justifyContent="center" mb={"-1.5rem"}>
              {auth.error ? (
                <Text textTransform="lowercase" color="#c0392b" pb={4}>
                  {auth.error}
                </Text>
              ) : (
                <></>
              )}
              <Button
                isLoading={auth.loading}
                spinner={<BeatLoader size={8} color="white" />}
                type="submit"
                bg="tomato"
                rounded="xl"
                size="lg"
                _hover={{ background: "purple.600" }}
              >
                <Text
                  _hover={{ color: "tomato" }}
                  fontSize="1rem"
                  color="white"
                >
                  submit
                </Text>
              </Button>
            </Flex>
          </Flex>
          <Toasts errors={errors} isSubmitSuccessful={isSubmitSuccessful} />
        </Flex>
      </form>
    </div>
  );
}

export default LogIn;
