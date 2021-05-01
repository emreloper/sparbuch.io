import { Box, Center, Heading, Spacer } from '@chakra-ui/layout';
import React from 'react';
import { AppShell } from '../components/AppShell';
import { PairSearch } from '../components/PairSearch';
import { PopularPairs } from '../components/PopularPairs';

const Home = () => {
  return (
    <AppShell>
      <Spacer h={6} />
      <Center h="full">
        <Box maxW="xl" w="full">
          <Box p={6} bg="white" shadow="base">
            <PairSearch />
          </Box>
          <Spacer h={6} />
          <Box p={6} bg="white" shadow="base">
            <Heading size="md" fontWeight="semibold">
              Popular Pairs
            </Heading>
            <Spacer h={4} />
            <PopularPairs />
          </Box>
        </Box>
      </Center>
      <Spacer h={6} />
    </AppShell>
  );
};

export default Home;
