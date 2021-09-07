import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../providers/authProvider";

function SignUp() {
  const auth = useAuth();
  const { colorMode } = useColorMode();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    auth.register(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
            p={12}
            rounded="xl"
            shadow="2xl"
          >
            <Heading mb={8}>Sign Up</Heading>
            <FormControl isInvalid={errors.username}>
              <Input
                mb={6}
                id="username"
                placeholder="username"
                variant="filled"
                type="username"
                {...register("username", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "Must be at least 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Must be at most 12 characters",
                  },
                })}
                borderRadius="sm"
                border={colorMode === "light" ? "2px solid" : "0px"}
                borderColor="gray.300"
                focusBorderColor="purple.600"
                rounded="xl"
              />
              <FormErrorMessage mb={3}>
                {errors.username && errors.username.message}
              </FormErrorMessage>
              {auth.error ? <Text color="red">{auth.error}</Text> : <></>}
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <Input
                mb={6}
                id="password"
                placeholder="password"
                variant="filled"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Must be at most 20 characters",
                  },
                })}
                borderRadius="sm"
                border={colorMode === "light" ? "2px solid" : "0px"}
                borderColor="gray.300"
                focusBorderColor="purple.600"
                rounded="xl"
              />
              <FormErrorMessage mb={6}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              isLoading={isSubmitting}
              type="submit"
              bg="tomato"
              rounded="xl"
              size="lg"
              _hover={{ background: "purple.600" }}
              mt={5}
              mb="-6"
            >
              <Text _hover={{ color: "tomato" }} color="white">
                Submit
              </Text>
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}

export default SignUp;
