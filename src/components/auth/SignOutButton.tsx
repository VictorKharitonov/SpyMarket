import React from 'react';
import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/', redirect: true });
  };

  return (
    <Button onClick={handleSignOut} variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} loadingText={'Loading'}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
