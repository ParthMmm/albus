import React from "react";
import { useAuth } from "../../providers/authProvider";
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
function Settings() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
  };

  if (auth.user) {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            height="60vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading mb={8}>{auth.user.username}'s favorites</Heading>

            <Flex direction="column" background="gray.700" p={12} rounded={6}>
              <FormControl isInvalid={errors.username}>
                <Heading fontSize="md">Favorite Genre</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="genre"
                  placeholder="genre"
                  variant="filled"
                />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <Heading fontSize="md">Favorite Artist</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="artist"
                  placeholder="artist"
                  variant="filled"
                />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <Heading fontSize="md">Favorite Album</Heading>

                <Input
                  mt={2}
                  mb={6}
                  id="album"
                  placeholder="album"
                  variant="filled"
                />
              </FormControl>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Button mt={6} colorScheme="teal" type="submit">
                  Cancel
                </Button>
                <Button
                  mt={6}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Settings;
