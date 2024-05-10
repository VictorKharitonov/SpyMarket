import { getUser } from '@/utlis/userHelper';
import ErrorHandler from '@/utlis/http/ErrorHandler';
import {NextRequest, NextResponse} from 'next/server';
import User_Tracker from '@/db/models/User_Tracker';
import { getServiceByUrl } from '@/utlis/serviceHelper';
import { createTracker } from '@/utlis/trackerHelper';
import {
  createUserTracker,
  deleteUserTracker,
  getUserTrackersWithUrl,
  updateUserTracker
} from '@/utlis/userTrackerHelper';

async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { id } = await getUser();
    const userTrackers = await User_Tracker.getUserTrackersByUserId(id);

    if (!userTrackers.length) {
      return Response.json([]);
    }
    
    const userTrackersWithUr = await getUserTrackersWithUrl(userTrackers);
    
    return Response.json(userTrackersWithUr);
  } catch (error) {
    return new ErrorHandler(error);
  }
}

async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    const user = await getUser();
    const service = await getServiceByUrl(url);
    const tracker = await createTracker(url);
    await createUserTracker(url, tracker.id, service.id, user.id);
    
    return Response.json('User tracker has created' );
  } catch (error) {
    return new ErrorHandler(error);
  }
}

async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    await updateUserTracker(id, status);
    
    return Response.json('tracker has updated');
  } catch (error) {
    return new ErrorHandler(error);
  }
}

async function DELETE(request: NextRequest) {
  try {
    const { id, trackerId } = await request.json();
    await deleteUserTracker(id, trackerId);
    
    return Response.json('tracker has deleted');
  } catch (error) {
    return new ErrorHandler(error);
  }
}

export { GET, POST, PATCH, DELETE }