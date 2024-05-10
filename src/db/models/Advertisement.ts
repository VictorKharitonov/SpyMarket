import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/db/models/index';
import Tracker from '@/db/models/Tracker';
import Service from '@/db/models/Service';
import {IPageParse, ISelectors} from '@/service/type';

export interface IAds {
  data: IPageParse[];
  tracker_id: string;
  service_id: string;
}

export interface IAdsData extends ISelectors {
  id: string;
  url: string,
  tracker_id: string;
  service_id: string;
}

export interface IAdsContent {
  data: IAdsData[],
  count: number;
}

class Advertisement extends Model {
  public static async getAdvertisementsByUrls(urls: string[]) {
    return this.findAll({
      where: { url: { [Op.in]: urls } },
    });
  }
  
  public static async getAdvertisementsByTrackersId(trackersId: string[], page: number, pageSize: number): Promise<IAdsContent> {
    if (page < 0) {
      throw new Error("page must be positive");
    }
    
    if (pageSize <= 0) {
      throw new Error("pageSize or page must be above than zero");
    }
    
    const count = await this.count({
      where: { tracker_id: { [Op.in]: trackersId } },
    })
    
    const ads = await this.findAll({
      where: { tracker_id: { [Op.in]: trackersId } },
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: page * pageSize
    })
    
    const mappedData:IAdsData[] = ads.map(ad => ad.dataValues);

    return { data: mappedData, count: Math.ceil(count / pageSize) };
  }
  
  public static async createAdvertisement(ads: IAds) {
    const data = ads.data.map((ad: IPageParse) => ({
      title: ad.title.text,
      description: ad.description,
      url: ad.title.url,
      city: ad.city,
      price: ad.price,
      tracker_id: ads.tracker_id,
      service_id: ads.service_id
    }))
    
    return this.bulkCreate(data);
  }
}

Advertisement.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false, unique: true },
    city: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.STRING, allowNull: true },
    tracker_id: {
      type: DataTypes.CHAR(36),
      references: {
        model: Tracker,
        key: 'id'
      }
    },
    service_id: {
      type: DataTypes.CHAR(36),
      references: {
        model: Service,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'advertisements',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['id', 'tracker_id', 'service_id'] }]
  }
);

export default Advertisement;