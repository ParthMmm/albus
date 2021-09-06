import React, { useEffect } from "react";
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
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { useAction } from "../../providers/actionProvider";
import NextLink from "next/link";

function Settings() {
  const auth = useAuth();
  const action = useAction();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    action.updateInfo(data);
    reset();
  };

  useEffect(() => {
    if (auth.userInfo?.info) {
      reset({
        genre: auth.userInfo.info.genre,
        artist: auth.userInfo.info.artist,
        album: auth.userInfo.info.album,
      });
    }
  }, []);

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

            <Flex direction="column" background="gray.700" p={12} rounded="xl">
              <FormControl>
                <Heading fontSize="md">Favorite Genre</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="genre"
                  placeholder="genre"
                  variant="filled"
                  {...register("genre")}
                />
              </FormControl>

              <FormControl>
                <Heading fontSize="md">Favorite Artist</Heading>
                <Input
                  mt={2}
                  mb={6}
                  id="artist"
                  placeholder="artist"
                  variant="filled"
                  {...register("artist")}
                />
              </FormControl>

              <FormControl>
                <Heading fontSize="md">Favorite Album</Heading>

                <Input
                  mt={2}
                  id="album"
                  placeholder="album"
                  variant="filled"
                  {...register("album")}
                />
              </FormControl>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              ></Flex>
              <ButtonGroup spacing="20" mt={10} mb="-6">
                <NextLink
                  href={{
                    pathname: `/profile/${auth.userInfo.user_id}`,
                  }}
                >
                  <Button
                    isLoading={isSubmitting}
                    bg="purple.600"
                    rounded="xl"
                    size="lg"
                    _hover={{ background: "tomato" }}
                  >
                    <Text _hover={{ color: "purple.600" }} color="white">
                      Cancel
                    </Text>
                  </Button>
                </NextLink>

                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  bg="tomato"
                  rounded="xl"
                  size="lg"
                  _hover={{ background: "purple.600" }}
                >
                  <Text _hover={{ color: "tomato" }} color="white">
                    Submit
                  </Text>
                </Button>
              </ButtonGroup>
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
