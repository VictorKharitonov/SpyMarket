'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useMutationCreateTracker } from '@/hooks/swr/userTracker';

const CreateTrackerForm = () => {
  const [tracker, setTracker] = useState('');
  const { mutationCreate, createError, isMutatingCreate } = useMutationCreateTracker();

  const handleTrackerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTracker(e.target.value);
  };

  const handleCreateTracker = async () => {
    await mutationCreate({ url: tracker });
  };

  return (
    <FormControl maxW={600} mb={10} isRequired>
      <FormLabel>Add Tracker</FormLabel>
      <Flex alignItems="center">
        <Input
          type="text"
          value={tracker}
          name="url"
          onChange={handleTrackerChange}
          mr={1}
          required={true}
          placeholder="https://bamper.by/zchbu/zapchast_akkumulyator-akb/marka_bmw/model_x3g01/"
        />
        <Button
          colorScheme="teal"
          zIndex={100}
          onClick={handleCreateTracker}
          isLoading={isMutatingCreate}
          type="submit"
        >
          Add
        </Button>
      </Flex>
      {createError && <FormHelperText color="red">{createError}</FormHelperText>}
    </FormControl>
  );
};

export default CreateTrackerForm;
