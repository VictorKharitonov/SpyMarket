import { SELECTORS } from '@/service/selectors';
import Parser from '@/service/parser';
import Advertisement, { IAds } from '@/db/models/Advertisement';
import Tracker from '@/db/models/Tracker';
import Service from '@/db/models/Service';
import { HttpError } from '@/utlis/http';
import { IPageParse } from '@/service/type';

export default class TrackerService {
  public readonly service: string;
  public readonly origin: string;
  public readonly url: URL;
  public readonly tracker: Tracker;

  constructor(tracker: Tracker) {
    this.tracker = tracker;
    this.url = new URL(tracker.dataValues.url);
    this.service = this.url.host;
    this.origin = this.url.origin;
  }

  private async getPage() {
    const res = await fetch(this.url, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new HttpError({ message: 'Failed to fetch ads', status: res.status });
    }

    return res.text();
  }

  private checkOnExistOrigin(url: string) {
    const isExistOrigin = url.includes(this.origin);

    if (isExistOrigin) {
      return url;
    }

    return `${this.origin}${url}`;
  }

  private async getService() {
    const service = await Service.getServiceByUrl(this.service);

    if (!service) {
      throw new Error(`Service not found`);
    }

    return service;
  }

  private async parse(): Promise<IAds> {
    const html = await this.getPage();
    const service = await this.getService();
    const tracker = this.tracker;
    const parser = new Parser(SELECTORS[this.service]);
    const parsedData = parser.Parse(html);

    const mappedByUrlParsedData = parsedData.map((item: IPageParse) => {
      item.title.url = this.checkOnExistOrigin(item.title.url);
      return item;
    });

    return {
      data: mappedByUrlParsedData,
      tracker_id: tracker.dataValues.id,
      service_id: service.dataValues.id
    };
  }

  private async getUniqueAds(ads: IAds) {
    const adsUrls = ads.data.map(item => item.title.url);
    const adsFromDB = await Advertisement.getAdvertisementsByUrls(adsUrls);

    return ads.data.filter(ad => !adsFromDB.find(adFromDb => adFromDb.dataValues.url === ad.title.url));
  }

  public async getAds(): Promise<IAds> {
    const parsedAds = await this.parse();
    const uniqueAds = await this.getUniqueAds(parsedAds);

    return {
      data: uniqueAds,
      tracker_id: parsedAds.tracker_id,
      service_id: parsedAds.service_id
    };
  }
}
