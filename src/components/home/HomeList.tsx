'use client';

import React from 'react';
import {Flex, List, ListItem, Text} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";

const HomeList = () => {
  return (
    <div>
      <List spacing={5}>
        <ListItem>
          <Flex alignItems="center">
            <CheckCircleIcon mr={2} color="teal.500" boxSize={5}/>
            <Text>Зарегистрируйтесь, после чего вам откроется набор инструметнов для мониторинга.</Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex alignItems="center">
          <CheckCircleIcon mr={2} color="teal.500" boxSize={5} />
          <Text>Добавьте ссылки на интересующие вас страницы и начните отслеживание.</Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex alignItems="center">
            <CheckCircleIcon mr={2} color="teal.500" boxSize={5} />
            <Text>Сервис будет регулярно проверять страницы и уведомлять вас о новых обявлениях.</Text>
          </Flex>
        </ListItem>
      </List>
    </div>
  );
};

export default HomeList;