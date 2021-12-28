import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  useColorMode,
  Button,
  HStack,
  Heading,
  Select,
  Spinner,
} from '@chakra-ui/react';
import _ from 'lodash';
import Reviews from './Reviews';
import { useAlbum } from '../../providers/albumProvider';
import { useAction } from '../../providers/actionProvider';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import CreateReview from './CreateReview';
import { useRouter } from 'next/router';
import fetcher from '../../utils/fetcher';
import useSWR, { mutate } from 'swr';
import { fetchAlbumReviews } from '../../utils/fetch';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';
import { useAuth } from '../../providers/authProvider';

import newReview from '../../utils/newReview';
import useAverageRating from '../../utils/useAverageRating';
function ReviewsController({ data, color, albumName, artist, isLoading }) {
  const album = useAlbum();
  const router = useRouter();
  const action = useAction();
  const auth = useAuth();

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [copyData, setCopyData] = useState('');
  const queryClient = useQueryClient();
  const { colorMode } = useColorMode();

  const bottomRef = useRef(null);

  let copyIndex;

  // const a = useQuery(["fetchReviews", albumName, artist], () =>
  //   useAlbumFetch(albumName, artist)
  // );
  // const { isLoading, error, data } = useQuery(
  //   ["fetchReviews", albumName, artist],
  //   () => useAlbumFetch(albumName, artist)
  // );
  // console.log(a);
  // useAverageRating(data);
  // letdata = a;
  // console.log(isLoading, error, data, avgRating);

  if (data) {
    copyIndex = data.length;
  }

  const executeScroll = () => {
    if (copyIndex >= 10) {
      while (copyIndex >= 10) {
        copyIndex /= 10;
      }

      if (copyIndex > page) {
        nextPage(Math.floor(copyIndex));
      }
    }
    if (bottomRef) {
      setTimeout(() => {
        bottomRef.current &&
          bottomRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      }, 500);
    }
    return;
  };

  useEffect(() => {
    action.setReviewCreated(false);
    console.log('🎇 new scroll created');

    return () => executeScroll();
  }, [action.reviewCreated]);

  useEffect(() => {
    setCopyData(data);
  }, [data]);

  const prevPage = () => {
    setFirstIndex(firstIndex - 10);
    setLastIndex(lastIndex - 10);
    setPage(page - 1);
  };

  const nextPage = (pageIndex) => {
    if (pageIndex) {
      setFirstIndex(10 * pageIndex);
      setLastIndex(10 * (pageIndex + 1));
      setPage(pageIndex + 1);
    } else {
      setFirstIndex(firstIndex + 10);
      setLastIndex(lastIndex + 10);
      setPage(page + 1);
    }
    return;
  };

  useEffect(() => {
    if (data && filter === 'newest') {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
      });

      setCopyData(sortByDate);
      console.log('new');
      return;
    }

    if (data && filter === 'oldest') {
      const sortByDate = [...data];
      sortByDate.sort((a, b) => {
        return (
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
      });

      setCopyData(sortByDate);
      console.log('old');

      return;
    }

    if (data && filter === 'rating') {
      //descending order
      const sortByRating = [...data];
      sortByRating.sort((a, b) => b.rating - a.rating);
      setCopyData(sortByRating);

      return;
    }

    if (filter === '') {
      setCopyData(data);
      return;
    }
  }, [filter]);

  if (copyData && data) {
    return (
      <>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading>reviews</Heading>
          <Flex alignItems='center' justifyContent='space-evenly'>
            <Select
              placeholder='sort by'
              variant='filled'
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              bg='none'
              _hover={{ color: 'purple.600' }}
            >
              <option value='newest'>newest</option>
              <option value='oldest'>oldest</option>
              <option value='rating'>rating</option>
            </Select>
            <CreateReview />
          </Flex>
        </Flex>
        <Reviews data={copyData.slice(firstIndex, lastIndex)} color={color} />
        <Flex
          flexDir='row'
          justifyContent='space-between'
          alignItems='center'
          m={2}
          flexShrink='0'
        >
          {firstIndex === 0 ? (
            <Button visibility='hidden' />
          ) : (
            <Button as={MdNavigateBefore} onClick={() => prevPage()} />
          )}
          <Text as='span' ref={bottomRef}>
            {page}
          </Text>
          {lastIndex >= data.length ? (
            <Button visibility='hidden' />
          ) : (
            <Button as={MdNavigateNext} onClick={() => nextPage()} />
          )}
        </Flex>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading>reviews</Heading>
          <CreateReview />
        </Flex>
        <Box
          mt={1}
          color={colorMode === 'dark' ? 'white' : 'black'}
          border='5px solid'
          borderColor={color}
          borderRadius='sm'
          rounded='xl'
          boxShadow='lg'
          p={5}
          //   w="80%"
          //   mx="auto"
          d='flex'
          justifyContent='center'
          bg={colorMode === 'dark' ? 'componentBg' : 'white'}
        >
          <Text>write the first review!</Text>
        </Box>
      </>
    );
  }
}

export default ReviewsController;
