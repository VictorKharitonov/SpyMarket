import React from 'react';
import {Box, Card, CardBody, Flex, ListItem, Text, Tooltip} from "@chakra-ui/react";
import classes from '@/components/tracker/tracker.module.scss';
import UpdateTrackerCheckBox from "@/components/tracker/UpdateTrackerCheckBox";
import DeleteTrackerButton from "@/components/tracker/DeleteTrackerButton";
import {IUserTracker} from "@/types/tracker";
import {Link} from "@chakra-ui/next-js";


const TrackerItem = ({ userTracker }: { userTracker: IUserTracker}) => {
  return (
    <ListItem key={userTracker.id} margin="10px 0 0 0">
      <Card >
        <CardBody>
          <Flex direction="row" alignItems="center" justifyContent="space-between">
            <Box className={classes.cardBody__text}>
              <Text
                fontSize="xl"
                mr={2}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                <Tooltip label={userTracker.url} bg='gray.300' color='black' hasArrow placement="top">
                  <Link href={userTracker.url} target="_blank" rel="nofollow">
                    {userTracker.url}
                  </Link>
                </Tooltip>
              </Text>
            </Box>
            <Box>
              <UpdateTrackerCheckBox userTracker={userTracker} />
              <DeleteTrackerButton userTracker={userTracker} />
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </ListItem>
  );
};

export default TrackerItem;