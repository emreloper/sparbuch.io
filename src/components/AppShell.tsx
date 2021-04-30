import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const AppShell: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Box bg="white" shadow="base">
        <Container display="flex" alignItems="center" maxW="7xl" height={12}>
          <Text as={RouterLink} to="/" fontSize="xl" fontWeight="semibold">
            Sparbuch.io
          </Text>
          <Spacer maxW={4} />
          <Stack>
            <Link href="#">🚜 Farms (soon...)</Link>
          </Stack>
        </Container>
      </Box>
      <Container flexGrow={1} maxW="7xl">
        {children}
      </Container>
      <Box bg="white" shadow="base">
        <Container maxW="7xl">
          <Center py={3}>
            <HStack>
              <IconButton
                as={Link}
                href="https://twitter.com/emreloper"
                target="_blank"
                icon={<FontAwesomeIcon icon={['fab', 'twitter']} />}
                aria-label="Twitter"
              />
              <IconButton
                as={Link}
                href="https://medium.com/@emreloper"
                target="_blank"
                icon={<FontAwesomeIcon icon={['fab', 'medium']} />}
                aria-label="Medium"
              />
            </HStack>
          </Center>
        </Container>
      </Box>
    </Flex>
  );
};
