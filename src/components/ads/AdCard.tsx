import React from 'react';
import {IAdsData} from "@/db/models/Advertisement";
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import {Link} from "@chakra-ui/next-js";

const AdCard = ({ item }: { item: IAdsData }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{item.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{item.description}</Text>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <Box>
            <Text>{item.city}</Text>
            <Text>{new URL(item.url).hostname}</Text>
          </Box>
          <Link href={item.url} target="_blank" rel="nofollow">
            <Button>View</Button>
          </Link>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default AdCard;