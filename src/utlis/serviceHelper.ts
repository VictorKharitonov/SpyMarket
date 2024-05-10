import Service from '@/db/models/Service';
import { HttpError } from '@/utlis/http';

export async function getServiceByUrl(url: string) {
  const host = new URL(url).host;
  const service = await Service.getServiceByUrl(host);
  
  if (!service) {
    throw new HttpError({ message: `Resource ${host} is not supported`, status: 404 })
  }
  
  return service.dataValues;
}