import { NextRequest } from 'next/server';
import { getAllTrackers } from '@/utlis/trackerHelper';
import TrackerService from '@/service/tracker';
import Advertisement from '@/db/models/Advertisement';
import ErrorHandler from '../../../utlis/http/ErrorHandler';

export async function GET(request: NextRequest) {
  try {
    const trackers = await getAllTrackers();

    for (const tracker of trackers) {
      const trackerService = new TrackerService(tracker);
      const ads = await trackerService.getAds();
      await Advertisement.createAdvertisement(ads);
    }
  } catch (error) {
    return new ErrorHandler(error);
  }
}
