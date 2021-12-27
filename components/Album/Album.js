import React, { useState, useEffect } from 'react';
import { Box, Text, Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useAlbum } from '../../providers/albumProvider';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { albumInfoFetch, albumSearchFetch } from '../../utils/fetch';
import { colors } from '../../utils/randoms';
import Image from 'next/image';
import useAverageColor from '../../utils/useAverageColor';
function Album({ thing }) {
  const album = useAlbum();
  const router = useRouter();

  let properties = {};
  let color;
  const { colorMode } = useColorMode();

  const searchSubmit = () => {
    router.push({
      pathname: '/search',
      query: { input: properties.artist },
    });
  };

  let randomNum = Math.floor(Math.random() * colors.length);

  if (thing._id && thing.mbid) {
    const { data, error, isValidating } = useSWR(
      albumInfoFetch + `&mbid=${thing.mbid}`,
      {
        revalidateOnFocus: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        dedupingInterval: 1000000,
      }
    );

    if (data?.error) {
      return null;
    }
    if (data) {
      properties = {
        imageUrl: data.album.image[2]['#text'],
        artist: data.album.artist,
        name: data.album.name,
        url: data.album.url,
      };
    }
  } else if (thing.albumName) {
    const { data, error, isValidating } = useSWR(
      albumInfoFetch + `&artist=${thing.artist}` + `&album=${thing.albumName}`,
      {
        revalidateOnFocus: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        dedupingInterval: 1000000,
      }
    );

    if (data?.error) {
      return null;
    }
    if (data) {
      properties = {
        imageUrl: data.album.image[2]['#text'],
        artist: data.album.artist,
        name: data.album.name,
        url: data.album.url,
      };
    }
  } else if (thing.artist?.name) {
    properties = {
      imageUrl: thing.image[2]['#text'],
      artist: thing.artist.name,
      name: thing.name,
      url: thing.url,
    };
  } else if (thing.artist) {
    properties = {
      imageUrl: thing.image[2]['#text'],
      artist: thing.artist,
      name: thing.name,
      url: thing.url,
    };
  }
  color = useAverageColor(properties?.imageUrl);

  if (properties.imageUrl === undefined) {
    return null;
  }

  return (
    <Box
      shadow='md'
      // w={{ base: "18vh", sm: "24vh", md: "100%" }}
      d='flex'
      flexFlow='row nowrap'
      rounded='xl'
    >
      {' '}
      <Box
        p={5}
        d='flex'
        alignItems='center'
        justifyContent='center'
        rounded='xl'
        roundedRight='none'
        bg={color}
        borderColor={color}
        w='45%'
      >
        <NextLink
          href={{
            pathname: `/album/[...slug]`,
            query: {
              artist: properties.artist,
              name: properties.name,
            },
          }}
          as={`/album/${properties.artist}/${encodeURIComponent(
            properties.name
          )}`}
          // passHref
        >
          <Image
            src={properties.imageUrl}
            alt='Album Cover'
            width={250}
            height={250}
            quality='100'
            layout='intrinsic'
            // fallbackSrc="https://via.placeholder.com/174"
          />
        </NextLink>
      </Box>
      <Box
        d='flex'
        justifyContent='center'
        alignItems='flex-start'
        flexDirection='column'
        px='4'
        // flexShrink="1"
        w='55%'
        // h="150"
        rounded='xl'
        roundedLeft='none'
        // w={{ base: "18vh", sm: "24vh", md: "full" }}
        bg={colorMode === 'dark' ? 'componentBg' : 'white'}
      >
        <NextLink
          href={{
            pathname: `/album/[...slug]`,
            query: {
              artist: properties.artist,
              name: properties.name,
            },
          }}
          as={`/album/${properties.artist}/${encodeURIComponent(
            properties.name
          )}`}
          passHref
        >
          <Text>
            <Link
              href=''
              fontWeight='bold'
              lineHeight='normal'
              fontSize={{ base: 'l', md: 'xl' }}
              _hover={{ color: 'tomato' }}
              color={colorMode === 'light' ? 'purple.600' : 'purple.300'}
              noOfLines={[2, 2, 2, 2, 3]}
            >
              {properties.name}
            </Link>
          </Text>
        </NextLink>

        <Text
          fontSize='md'
          fontWeight='semibold'
          _hover={{ color: 'tomato' }}
          textDecoration='purple'
        >
          <Link
            href=''
            onClick={() => searchSubmit()}
            noOfLines={[2, 2, 2, 2, 3]}
            // isExternal
          >
            {' '}
            {properties.artist}
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Album;
