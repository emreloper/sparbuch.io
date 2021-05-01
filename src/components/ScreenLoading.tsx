import { Box, Center, Container, Progress } from '@chakra-ui/react';
import React from 'react';

export const ScreenLoading = () => {
  return (
    <Container maxW="7xl" h="100vh">
      <Center h="full">
        <Box w="full" maxW="xl">
          <Progress
            colorScheme="purple"
            flexGrow={1}
            size="sm"
            isIndeterminate
          />
        </Box>
      </Center>
    </Container>
  );
};
