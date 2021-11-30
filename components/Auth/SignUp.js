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
import Toasts from "./Toasts";

function SignUp() {
  const auth = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const toastIdRef = React.useRef();

  // const authToast = "authErrorToast";
  // const userToast = "userErrorToast";
  // const passToast

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    auth.register(data);
    reset();
  };

  // useEffect(() => {
  //   if (auth.error) {
  //     toastIdRef.current = toast({
  //       description: auth.error,
  //       status: "error",
  //       duration: 10000,
  //       isClosable: true,
  //     });
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
  // console.log(errors);
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
                  href=""
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
          >
            <Heading mt={-4}>Sign Up</Heading>

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
        </Flex>
      </form>
      <Toasts errors={errors} isSubmitSuccessful={isSubmitSuccessful} />
    </div>
  );
}

export default SignUp;
