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
  FormLabel,
  FormErrorMessage,
  FormControl,
  Input,
  useColorMode,
  Textarea,
  NumberInput,
  Box,
} from "@chakra-ui/react";
import { MdPeople, MdPlayArrow, MdAdd } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/hooks";
import { useForm, useFormState } from "react-hook-form";
import { Rating, RatingView } from "react-simple-star-rating";
import { Formik, Field, Form } from "formik";
import { useAction } from "../../providers/actionProvider";
import { useAlbum } from "../../providers/albumProvider";

// import ReviewModal from "./ReviewModal";

function CreateReview() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const album = useAlbum();

  const submitHandler = () => {
    // useNewReview(true);

    console.log("submitted");
  };

  return (
    <>
      <Button
        onClick={onOpen}
        as={MdAdd}
        size="md"
        bg="none"
        _hover={{ color: "purple.600" }}
      >
        Open Modal
      </Button>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        album={album?.album}
        submitHandler={submitHandler}
      />
    </>
  );
}

const ReviewModal = ({ isOpen, onClose, album, submitHandler }) => {
  const [rating, setRating] = useState(0);
  const action = useAction();
  const albumProvider = useAlbum();

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  // setNewReview(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>write a review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: "",
              reviewBody: "",
              rating: 0,
            }}
            onSubmit={(values, actions) => {
              values = { ...values, album };

              action.createReview(values);
              actions.setSubmitting(false);
              actions.resetForm({});
              setRating(0);

              // submitHandler();

              onClose();
            }}
          >
            <Form>
              <Field name="rating" type="number">
                {({ field, form: { setFieldValue, errors } }) => (
                  <FormControl>
                    <Rating
                      {...field}
                      id="rating"
                      onClick={(rate) => {
                        setRating(rate);
                        setFieldValue("rating", rate);
                      }}
                      ratingValue={rating}
                    />
                    <FormErrorMessage>{errors.rating}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="title">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                    mt={3}
                  >
                    <Input
                      {...field}
                      id="title"
                      placeholder="enter title here"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="reviewBody">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.review && form.touched.review}
                    mt={4}
                  >
                    <Textarea
                      {...field}
                      id="reviewBody"
                      placeholder="enter review here"
                    />
                    <FormErrorMessage>{form.errors.review}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box d="flex" justifyContent="space-between" my={4}>
                {" "}
                <Button
                  colorScheme="blue"
                  mr={3}
                  variant="ghost"
                  onClick={onClose}
                >
                  cancel
                </Button>
                <Button
                  isLoading={action.loading}
                  type="submit"
                  bg="tomato"
                  rounded="xl"
                  size="md"
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
              </Box>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateReview;
