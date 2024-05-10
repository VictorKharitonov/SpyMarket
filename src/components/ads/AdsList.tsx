'use client';

import React, { useState } from 'react';
import { Alert, AlertIcon, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import AdCard from '@/components/ads/AdCard';
import { useAds } from '@/hooks/swr/useAds';

const AdsList = () => {
  const [page, setPage] = useState(0);
  const { ads, isLoading, isValidating, error } = useAds(page);

  const handleClickNext = () => {
    setPage(page => page + 1);
  };

  const handleClickPrev = () => {
    setPage(page => page - 1);
  };

  if (isLoading || isValidating) {
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
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      {ads?.data.length ? (
        <>
          {ads.data.map(ad => (
            <AdCard item={ad} key={ad.id} />
          ))}
          {page > 0 && (
            <Button className="btn__next" onClick={handleClickPrev}>
              prev
            </Button>
          )}
          {ads.count - 1 > page && (
            <Button className="btn__prev" onClick={handleClickNext}>
              next
            </Button>
          )}
        </>
      ) : (
        <Text>not found</Text>
      )}
    </SimpleGrid>
  );
};

export default AdsList;
