import User_Tracker from '@/db/models/User_Tracker';
import Tracker from '@/db/models/Tracker';
import { HttpError } from '@/utlis/http';

export async function getUserTrackersWithUrl(userTrackers: User_Tracker[]) {
  const userTrackersDictionary: Record<string, User_Tracker> = userTrackers.reduce(
    (userTrackers: Record<string, User_Tracker>, tracker: User_Tracker) => {
      const trackerId: string = tracker.dataValues.tracker_id;
      userTrackers[trackerId] = tracker.dataValues;
      
      return userTrackers;
    },
    {}
  );
  
  const ids = userTrackers.map(tracker => tracker.dataValues.tracker_id);
  const trackers = await Tracker.getAllTrackersByUserTrackerIds(ids);
  
  return trackers.map((tracker, i) => {
    const userTracker = userTrackersDictionary[tracker.dataValues.id];
    return { ...userTracker, url: tracker.dataValues.url };
  })
}

export async function createUserTracker(url: string, trackerId: string, serviceId: string, userId: string) {
  const isTracker = await User_Tracker.getUserTrackerByTrackerId(trackerId, userId);
  
  if (isTracker) {
    throw new HttpError({ message: `${url} already exists`, status: 405 });
  }
  
  await User_Tracker.createUserTracker(url, trackerId, serviceId, userId);
}

export async function updateUserTracker(id: string, status: boolean) {
  await validateUserTrackerById(id);
  await User_Tracker.updateUserTracker(id, status);
}

export async function deleteUserTracker(id: string, trackerId: string) {
  await validateUserTrackerById(id);
  await User_Tracker.deleteUserTracker(id);
  const userTracker = await User_Tracker.getUserTrackerByTrackerId(trackerId);
  
  if (!userTracker) {
    await Tracker.deleteTracker(trackerId);
  }
}

export async function validateUserTrackerById(id: string) {
  const userTracker = await User_Tracker.getUserTrackerById(id);
  
  if (!userTracker) {
    throw new HttpError({ message: `Tracker not found`, status: 404 });
  }
}