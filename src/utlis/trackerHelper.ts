import Tracker from '@/db/models/Tracker';
import { HttpError } from '@/utlis/http';

export async function createTracker(url: string) {
  let tracker = await Tracker.getTrackerByUrl(url);
  
  if (!tracker) {
    await Tracker.createTracker(url);
  } else {
    return tracker.dataValues;
  }
  
  tracker = await Tracker.getTrackerByUrl(url);
  
  if (!tracker) {
    throw new HttpError({ message: 'Tracker doesnt created', status: 404 });
  }
  
  return tracker.dataValues;
}

export async function getAllTrackers() {
  const trackers = await Tracker.getAllTrackers();
  
  if (trackers.length === 0) {
    return [];
  }
  
  return trackers;
}