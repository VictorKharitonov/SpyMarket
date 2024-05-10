'use client';
import {ReactNode} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

const Provider = ({ children, session }: { children: ReactNode, session: Session | null }) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </ChakraProvider>
  );
};

export default Provider;