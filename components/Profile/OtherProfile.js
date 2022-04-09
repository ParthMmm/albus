import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../providers/authProvider';
import { useProfile } from '../../providers/profileProvider';
import {
  Box,
  Heading,
  Center,
  Text,
  Skeleton,
  Grid,
  Button,
  Icon,
  Link,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import SavedAlbums from './SavedAlbums';
import ProfileReviews from './ProfileReviews';
import { FaSpotify, FaLastfmSquare } from 'react-icons/fa';
import { useQuery } from 'react-query';
import fetchUserReviews from '../../utils/queries/fetchUserReviews';
import fetchUserInfo from '../../utils/queries/fetchUser';

function OtherProfile() {
  const auth = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (auth.user) {
      setAuthorized(true);
    }
  }, [router.query]);

  const user = useQuery(
    ['fetchUserInfo', router.query.pid],
    () => fetchUserInfo(router.query.pid),
    { enabled: !!router.query.pid }
  );

  const reviews = useQuery(
    ['fetchUserReviews', router.query.pid],
    () => fetchUserReviews(router.query.pid),
    {
      enabled: !!router.query.pid,
    }
  );

  if (user.isLoading) {
    return (
      <>
        <Box w='80%' mx='auto' mt={10} d='flex'>
          <Skeleton
            startColor='pink.500'
            endColor='orange.500'
            h='30rem'
            rounded='lg'
          />
        </Box>
        <Box w='80%' mx='auto' mt={10} d='flex'>
          <Grid gridTemplateColumns={['repeat(5, 1fr)']} gap={3}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                startColor='orange.500'
                endColor='purple.500'
                height='25rem'
                key={i}
              />
            ))}
          </Grid>
        </Box>
      </>
    );
  }
  if (!user.data) {
    return (
      <>
        <Box w='80%' mx='auto' mt={10} d='flex'>
          <Skeleton
            startColor='pink.500'
            endColor='orange.500'
            h='30rem'
            rounded='lg'
          />
        </Box>
        <Box w='80%' h='50rem' mx='auto' mt={10}>
          <Skeleton
            startColor='pink.500'
            endColor='orange.500'
            h='50rem'
            rounded='lg'
          />
        </Box>
      </>
    );
  }

  if (user.data && !user.isLoading) {
    return (
      <>
        <Box
          w={{ base: '80%', md: '40%', lg: '40%' }}
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
          borderColor='purple.600'
          borderRadius='sm'
          rounded='xl'
          boxShadow='lg'
          flexDir={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
        >
          <Box
            p='5'
            d='flex'
            justifyContent={{ base: 'center', sm: 'center', md: 'center' }}
            alignItems='center'
            flexShrink={{ sm: '1', md: '0' }}
            flexFlow='column wrap'
          >
            <Box alignItems='center' justifyContent='center'>
              {' '}
              <Box mt={3} mb={2} justifyContent='center'>
                {' '}
                <Heading>{user.data?.username}</Heading>
              </Box>
              <Box
                d='flex'
                flexDir='row'
                justifyContent={{
                  base: 'center',
                  sm: 'center',
                  md: 'flex-start',
                }}
              >
                {user?.data?.info?.spotify ? (
                  <Link
                    href={`https://open.spotify.com/user/${user?.data?.info?.spotify}`}
                  >
                    {' '}
                    <Icon as={FaSpotify} w={5} h={5} mr={2} color='#1DB954' />
                  </Link>
                ) : (
                  <></>
                )}
                {user?.data?.info?.lastfm ? (
                  <Link
                    href={`https://www.last.fm/user/${user?.data?.info?.lastfm}`}
                  >
                    <Icon as={FaLastfmSquare} w={5} h={5} color='#c3000d ' />
                  </Link>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            d='flex'
            alignItems={{ base: 'center', md: 'baseline' }}
            flexDir='column'
            p={{ base: '1', md: '5' }}
            justifyContent='space-evenly'
            // p={{ base: "1", sm: "1", md: "1", lg: "10" }}
          >
            {user.data?.info?.genre ? (
              <Box
                d='flex'
                flexDir='row'
                justifyContent='center'
                alignItems='baseline'
              >
                <Box>
                  <Tooltip label='favorite genre' openDelay={500}>
                    <Text>#️⃣</Text>
                  </Tooltip>
                </Box>

                <Box>
                  <Text as='span' mx='2' fontWeight='bold' fontSize='lg'>
                    {user.data?.info?.genre}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
            {user.data?.info?.artist ? (
              <Box
                d='flex'
                flexDir='row'
                justifyContent='center'
                alignItems='baseline'
              >
                <Box>
                  <Text>😎</Text>
                </Box>

                <Box>
                  <Text as='span' mx='2' fontWeight='bold' fontSize='lg'>
                    {user.data?.info?.artist}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
            {user.data?.info?.album ? (
              <Box
                d='flex'
                flexDir='row'
                justifyContent='center'
                alignItems='baseline'
              >
                <Box>
                  <Text>💿</Text>
                </Box>

                <Box>
                  <Text as='span' mx='2' fontWeight='bold' fontSize='lg'>
                    {user.data?.info?.album}
                  </Text>
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>

        <Box
          d='flex'
          justifyContent='center'
          alignItems='flex-start'
          mt={10}
          mx={10}
          flexDir={{ base: 'column', md: 'row' }}
        >
          {user.data.reviews ? (
            <Box w={{ md: '40%' }}>
              <ProfileReviews reviews={reviews} />
            </Box>
          ) : (
            <></>
          )}
          <Box w={{ md: '60%' }}>
            <SavedAlbums profile={user.data} />
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <Center>
        <Heading>hmm something is missing</Heading>
      </Center>
    );
  }
}

export default OtherProfile;
