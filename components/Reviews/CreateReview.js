import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormErrorMessage,
  FormControl,
  Input,
  useColorMode,
  Textarea,
} from "@chakra-ui/react";
import { MdPeople, MdPlayArrow, MdAdd } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/hooks";
import { useForm, useFormState } from "react-hook-form";

function CreateReview() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, submitCount },
    reset,
    clearErrors,
    control,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  return (
    <>
      <Button onClick={onOpen} as={MdAdd} size="sm">
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                mb={5}
                id="title"
                placeholder="title"
                variant="filled"
                type="title"
                {...register("title", {
                  required: true,

                  maxLength: {
                    value: 12,
                    message: "title must be at most 30 characters",
                  },
                })}
                borderRadius="sm"
                border={colorMode === "light" ? "2px solid" : "0px"}
                borderColor="gray.300"
                focusBorderColor="purple.600"
                rounded="xl"
              />
            </FormControl>

            <FormControl mt={4}>
              <Textarea
                mb={5}
                id="review"
                placeholder="review"
                variant="filled"
                type="review"
                {...register("review", {
                  required: true,

                  maxLength: {
                    value: 12,
                    message: "review must be at most 280 characters",
                  },
                })}
                borderRadius="sm"
                border={colorMode === "light" ? "2px solid" : "0px"}
                borderColor="gray.300"
                focusBorderColor="purple.600"
                rounded="xl"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateReview;
