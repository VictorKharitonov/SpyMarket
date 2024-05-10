'use client';

import React from 'react';
import { Alert, AlertIcon, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Alert status="error" borderRadius={10}>
      <Alert status="error">
        <Flex flexDirection="column">
          <Box mb={5}>
            <Heading as="h1" mb={2}>
              Something went wrong
            </Heading>
            <Flex>
              <Text mr={2}>{error.message}</Text>
              <AlertIcon />
            </Flex>
          </Box>
          <Box>
            <Button onClick={() => reset()}>Try again</Button>
          </Box>
        </Flex>
      </Alert>
    </Alert>
  );
}
