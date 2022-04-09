import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  FormErrorMessage,
  FormControl,
  Input,
  Textarea,
  Box,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/hooks';
import { Rating } from 'react-simple-star-rating';
import { Formik, Field, Form } from 'formik';
import { useAction } from '../../providers/actionProvider';
import { useAlbum } from '../../providers/albumProvider';
import newReview from '../../utils/newReview';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../providers/authProvider';
function CreateReview() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const album = useAlbum();
  const auth = useAuth();

  return (
    <>
      <IconButton
        aria-label='add'
        size='md'
        bg='none'
        _hover={{ color: 'purple.600' }}
        icon={<Icon as={MdAdd} w={7} h={7} />}
        isDisabled={!auth.user}
        onClick={() => (auth.user ? onOpen : null)}
      />
      <ReviewModal isOpen={isOpen} onClose={onClose} album={album?.album} />
    </>
  );
}

const ReviewModal = ({ isOpen, onClose, album }) => {
  const [rating, setRating] = useState(0);
  const action = useAction();
  const queryClient = useQueryClient();
  const auth = useAuth();

  const mutation = useMutation(
    (values) => {
      newReview(values, auth.user.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'fetchReviews',
          album.albumName,
          album.artist,
        ]);

        action.setReviewCreated(true);
      },
    }
  );

  const validate = (values) => {
    const errors = {};

    if (!values.rating) {
      errors.rating = 'required';
    }
    if (!values.title) {
      errors.title = 'required';
    }
    if (!values.reviewBody) {
      errors.reviewBody = 'required';
    }

    return errors;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>write a review</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setRating(0);
          }}
        />
        <ModalBody>
          <Formik
            validate={validate}
            initialValues={{
              title: '',
              reviewBody: '',
              rating: 0,
            }}
            onSubmit={(values, actions) => {
              values = { ...values, album };
              mutation.mutate(values);

              actions.resetForm({});

              setRating(0);

              onClose();
            }}
          >
            <Form>
              <Field name='rating' type='number'>
                {({ field, form: { setFieldValue, errors, touched } }) => (
                  <FormControl isInvalid={errors.rating && touched.rating}>
                    <Rating
                      {...field}
                      id='rating'
                      onClick={(rate) => {
                        setRating(rate);
                        setFieldValue('rating', rate);
                      }}
                      ratingValue={rating}
                    />
                    <FormErrorMessage>{errors.rating}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='title'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                    mt={3}
                  >
                    <Input
                      {...field}
                      id='title'
                      placeholder='enter title here'
                    />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='reviewBody'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.reviewBody && form.touched.reviewBody
                    }
                    mt={4}
                  >
                    <Textarea
                      {...field}
                      id='reviewBody'
                      placeholder='enter review here'
                    />
                    <FormErrorMessage>
                      {form.errors.reviewBody}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box d='flex' justifyContent='space-between' my={4}>
                {' '}
                <Button
                  colorScheme='blue'
                  mr={3}
                  variant='ghost'
                  onClick={() => {
                    setRating(0);
                    onClose();
                  }}
                >
                  cancel
                </Button>
                <Button
                  isLoading={action.loading}
                  type='submit'
                  bg='tomato'
                  rounded='xl'
                  size='md'
                  _hover={{ background: 'purple.600' }}
                  isDisabled={!auth.user}
                >
                  <Text
                    _hover={{ color: 'tomato' }}
                    fontSize='1rem'
                    color='white'
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
