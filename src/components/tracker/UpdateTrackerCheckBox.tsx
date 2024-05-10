import React from 'react';
import {Switch} from "@chakra-ui/react";
import {IUserTracker} from "@/types/tracker";
import {useMutationUpdateTracker} from "@/hooks/swr/userTracker";


const UpdateTrackerCheckBox = ({ userTracker }: { userTracker: IUserTracker}) => {
  const { mutationUpdate, updateError, isMutatingUpdate } = useMutationUpdateTracker();
  
  return (
    <Switch
      name="status"
      colorScheme='teal'
      size='lg'
      onChange={() => mutationUpdate({ id: userTracker.id, status: !userTracker.status })}
      isChecked={userTracker.status}
      disabled={isMutatingUpdate}
      mr={4}
    />
  );
};

export default UpdateTrackerCheckBox;