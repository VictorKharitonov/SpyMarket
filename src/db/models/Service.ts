import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db/models/index';

class Service extends Model {
  public static getServiceByUrl(url: string) {
    return this.findOne({ where: { url } })
  }
  
  public static async createService(url: string) {
    await this.create({ url });
  }
}

Service.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    url: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'services',
    freezeTableName: true,
  }
);

export default Service;