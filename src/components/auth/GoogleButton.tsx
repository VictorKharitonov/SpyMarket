import React from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSignByGoogle = async () => {
    await signIn('google', { callbackUrl });
  };

  return (
    <Button
      onClick={handleSignByGoogle}
      variant={'solid'}
      colorScheme={'teal'}
      size={'sm'}
      mr={4}
      leftIcon={<AddIcon />}
      loadingText={'Loading'}
    >
      Sign In With Google
    </Button>
  );
};

export default GoogleButton;
