import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import TrackerService from '@/service/tracker';
import { getAllTrackers } from '@/utlis/trackerHelper';
import cron from 'node-cron';
import Advertisement from "@/db/models/Advertisement";
import {Heading, Text} from "@chakra-ui/react";
import React from "react";
import HomeList from "@/components/home/HomeList";


export default async function Page() {
  const session = await getServerSession(authConfig);
  
  // cron.schedule('*/1 * * * *',  async () => {
  //   const trackers = await getAllTrackers();
  //   for(const tracker of trackers) {
  //     const trackerService = new TrackerService(tracker);
  //     const ads = await trackerService.getAds();
  //     await Advertisement.createAdvertisement(ads);
  //   }
  // });

  return (
    <>
      <Heading as="h1" mb={10}>Мониторинг торговых площадок</Heading>
      <Text maxW={600} mb={2}>Отслеживание изменения и наличия товаров в реальном времени. Легко добавляйте, удаляйте и управляйте отслеживаемыми ссылками.</Text>
      <Text mb={2}>На данный момент отслеживается только один сервис: <strong>Bamper.by</strong>.</Text>
      <Text mb={20}>Со временем список будет пополняться.</Text>
      <Heading as="h2" size="lg" mb={10}>Как это работает?</Heading>
      <HomeList />
    </>
  );
}
