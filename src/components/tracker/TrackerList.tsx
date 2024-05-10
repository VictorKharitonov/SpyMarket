'use client';

import React from 'react';
import { Alert, AlertIcon, List, Spinner, Text } from '@chakra-ui/react';
import classes from '@/components/tracker/tracker.module.scss';
import { IUserTracker } from '@/types/tracker';
import TrackerItem from '@/components/tracker/TrackerItem';
import { useTracker } from '@/hooks/swr/userTracker';

const TrackerList = () => {
  const { trackers, error, isLoading } = useTracker();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <List className={classes.list}>
      {trackers.length > 0 ? (
        trackers.map((tracker: IUserTracker) => <TrackerItem userTracker={tracker} key={tracker.id} />)
      ) : (
        <Text fontSize="xl">Trackers not found</Text>
      )}
    </List>
  );
};

export default TrackerList;
