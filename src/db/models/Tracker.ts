import {DataTypes, Model, Op} from 'sequelize';
import sequelize from '@/db/models/index';

class Tracker extends Model {
  public static getTrackerByUrl(url: string) {
    return this.findOne({ where: { url: url } });
  }
  
  public static getAllTrackers() {
    return this.findAll();
  }
  
  public static getAllTrackersByUserTrackerIds(ids: string[]) {
    return this.findAll({
      where: {
        id: { [Op.in]: ids }
      }
    });
  }
  
  public static getTrackerById(id: string) {
    return this.findOne({ where: { id: id } })
  }
  
  public static async createTracker(url: string) {
    await this.create({ url });
  }
  
  public static async deleteTracker(id: string) {
    await this.destroy({ where: { id: id } });
  }
}

Tracker.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    url: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'trackers',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['id'] }]
  }
);

export default Tracker;