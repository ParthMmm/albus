import React, { useState } from "react";
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
import { Rating, RatingView } from "react-simple-star-rating";
const ReviewModal = ({
  isOpen,
  onClose,
  register,
  reset,
  errors,
  isSubmitting,
  isSubmitSuccessful,
  submitHandler,
}) => {
  const { colorMode } = useColorMode();
  const [rating, setRating] = useState(0); // initial rating value

  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <Rating
                id="rating"
                type="rating"
                {...register("rating", { required: true })}
                onClick={handleRating}
                ratingValue={rating} /* Rating Props */
              />
            </FormControl>
            <FormControl>
              <Input
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
