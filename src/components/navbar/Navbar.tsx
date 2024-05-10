'use client';
import {Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue, Stack, Container} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {useSession} from "next-auth/react";
import {Authenticated} from "@/consts";
import GoogleButton from "@/components/auth/GoogleButton";
import SignOutButton from "@/components/auth/SignOutButton";
import NavLinkList from "@/components/navbar/NavLinkList";


const Navbar = () => {
  const { status: authStatus } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuth = authStatus === Authenticated;
  
  return (
    <header>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLinkList isAuthenticated={isAuth} />
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {
              isAuth
              ? <SignOutButton />
              : <GoogleButton />
            }
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLinkList isAuthenticated={isAuth} />
            </Stack>
          </Box>
        ) : null}
        </Container>
      </Box>
    </header>
  );
}

export default Navbar;