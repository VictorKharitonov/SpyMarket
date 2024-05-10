import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { HttpError } from '@/utlis/http';

import User from '@/db/models/User';

export async function getUser (){
  const session = await getServerSession(authConfig);
  
  if (!session) {
    throw new HttpError({ message: 'Access denied', status: 401 });
  }
  
  const user = await User.getUserByEmail(session?.user?.email);
  
  if (!user) {
    throw new HttpError({ message: 'User not found', status: 404 });
  }
  
  return user.dataValues;
}