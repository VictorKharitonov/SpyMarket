import {NextRequest} from 'next/server';
import { getUser } from '@/utlis/userHelper';
import User_Tracker from '@/db/models/User_Tracker';
import ErrorHandler from '../../../utlis/http/ErrorHandler';
import Advertisement from '@/db/models/Advertisement';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 0;
    const size = 20;
    
    const { id } = await getUser();
    const userTrackers = await User_Tracker.getActiveUserTrackersByUserId(id);
    
    if (!userTrackers.length) {
      return Response.json({ data: [] });
    }
    
    const userTrackersIds = userTrackers.map(userTracker => userTracker.dataValues.tracker_id);
    
    const ads = await Advertisement.getAdvertisementsByTrackersId(userTrackersIds, page, size);
    
    if (!ads.data.length) {
      return Response.json({ data: [] });
    }
    
    return Response.json({ data: ads });
  } catch (error) {
    return new ErrorHandler(error);
  }
}