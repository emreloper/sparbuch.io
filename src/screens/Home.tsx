import { Box, Center, Flex } from '@chakra-ui/layout';
import React from 'react';
import { AppShell } from '../components/AppShell';
import { PairSearch } from '../components/PairSearch';

const Home = () => {
  return (
    <AppShell>
      <Center h="full">
        <Box p={6} maxW="xl" width="full" bg="white" shadow="base">
          <PairSearch />
        </Box>
      </Center>
    </AppShell>
  );
};

export default Home;
