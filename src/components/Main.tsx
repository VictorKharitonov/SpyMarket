import React from 'react';
import {Box, Container} from "@chakra-ui/react";

const Main = ({ children }: { children: React.ReactNode}) => {
  return (
    <main>
      <Container maxW="container.xl">
        <Box pt={10} pb={10}>
          {children}
        </Box>
      </Container>
    </main>
  );
};

export default Main;