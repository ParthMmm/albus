import {
  Box,
  Heading,
  Flex,
  Text,
  Skeleton,
  Stack,
  Link,
  Button,
  Collapse,
  SimpleGrid,
  GridItem,
  Grid,
  Divider,
  Center,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

import { useRouter } from 'next/router';
import { MdPeople, MdPlayArrow, MdAdd } from 'react-icons/md';

import NumberFormat from 'react-number-format';
import ActionButtons from './ActionButtons';
import Tags from './Tags';
import Tracklist from './Tracklist';
import Wiki from './Wiki';
import Image from 'next/image';

import { RatingView } from 'react-simple-star-rating';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import ShareButton from './ShareButton';
function AlbumInfo({ currentAlbum, color, avgRating }) {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const searchSubmit = () => {
    router.push({
      pathname: '/search',
      query: { input: currentAlbum.artist },
    });
  };

  return (
    <Box
      w='80%'
      mx='auto'
      mt={10}
      d='flex'
      flexGrow='1'
      justifyContent={{
        base: 'center',
        sm: 'center',
        md: 'center',
        lg: 'space-between',
      }}
      border='5px solid'
      borderColor={color}
      borderRadius='sm'
      rounded='xl'
      boxShadow='lg'
      flexDir={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
      bg={colorMode === 'dark' ? 'componentBg' : 'white'}
    >
      <Box
        p='5'
        d='flex'
        // justifyContent={{ base: "center", sm: "center", md: "center" }}
        flexShrink={{ sm: '1', md: '0' }}
        flexFlow='column wrap'
        color={colorMode === 'dark' ? 'white' : 'black'}
      >
        <Image
          width={350}
          height={350}
          src={currentAlbum.image}
          objectFit='contain'
        />

        <Text mt={2} fontSize='xl' fontWeight='bold' lineHeight='short'>
          <Link
            href={currentAlbum.url}
            _hover={{ color: 'tomato' }}
            textDecoration='none'
          >
            {currentAlbum.name}
          </Link>
        </Text>
        <Text mt={2} fontSize='lg' fontWeight='semibold'>
          <Link
            href=''
            onClick={() => searchSubmit()}
            _hover={{ color: 'tomato' }}
            textDecoration='none'
          >
            {' '}
            {currentAlbum.artist}
          </Link>
        </Text>
        <Flex mt={2} align='center'>
          <Box as={MdPlayArrow} color='orange.400' />
          <Text ml={1} fontSize='sm'>
            <b>
              <NumberFormat
                value={currentAlbum.playcount}
                displayType='text'
                thousandSeparator={true}
              />
            </b>
          </Text>
        </Flex>
        <Flex mt={2} align='center'>
          <Box as={MdPeople} color='orange.400' />
          <Text ml={1} fontSize='sm'>
            <b>
              <NumberFormat
                value={currentAlbum.listeners}
                displayType='text'
                thousandSeparator={true}
              />
            </b>
          </Text>
        </Flex>
        <Flex mt={2} align='center'>
          <RatingView ratingValue={avgRating} />
        </Flex>
        <SimpleGrid
          mt={3}
          columns={{ base: 2, sm: 4, md: 5, lg: 3 }}
          row={{ base: 1, sm: 1, md: 2, lg: 2 }}
          spacingY='2px'
          spacingX='2px'
        >
          {currentAlbum.tags ? (
            currentAlbum.tags.map((tag) => (
              <GridItem>
                <Tags key={tag.url} tag={tag} />{' '}
              </GridItem>
            ))
          ) : (
            <></>
          )}
        </SimpleGrid>
      </Box>

      {currentAlbum.wiki ? (
        <Box>
          {' '}
          <Wiki summary={currentAlbum.wiki} />
        </Box>
      ) : (
        <Box d='flex' flexDir='row-reverse' m='4' justifyContent='flex-start'>
          {' '}
          <ShareButton />
        </Box>
      )}
    </Box>
  );
}

export default AlbumInfo;
