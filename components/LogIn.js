import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../providers/authProvider";

function LogIn() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    auth.login(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex direction="column" background="gray.700" p={12} rounded={6}>
            <Heading mb={8}>Log In</Heading>
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
              />
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
              />
            </FormControl>

            <Button
              mt={6}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Log In
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}

export default LogIn;
