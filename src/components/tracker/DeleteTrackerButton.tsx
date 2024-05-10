import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { IUserTracker } from '@/types/tracker';
import { useMutationDeleteTracker } from '@/hooks/swr/userTracker';

const DeleteTrackerButton = ({ userTracker }: { userTracker: IUserTracker }) => {
  const { mutationDelete, isMutatingDelete } = useMutationDeleteTracker();

  return (
    <IconButton
      isRound={false}
      variant="solid"
      colorScheme="blue"
      size="md"
      aria-label="Done"
      fontSize="20px"
      isLoading={isMutatingDelete}
      onClick={() => mutationDelete({ id: userTracker.id, trackerId: userTracker.tracker_id })}
      icon={<DeleteIcon />}
    />
  );
};

export default DeleteTrackerButton;
