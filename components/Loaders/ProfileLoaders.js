import React from 'react';
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
} from '@chakra-ui/react';
function ProfileLoaders() {
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
              rounded='lg'
              key={i}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ProfileLoaders;
