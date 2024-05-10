import { DataTypes, Model } from 'sequelize';

import sequelize from '@/db/models/index';
import Tracker from '@/db/models/Tracker';
import Service from '@/db/models/Service';
import User from '@/db/models/User';

class User_Tracker extends Model {
  public static getUserTrackersByUserId(userId: string) {
    return this.findAll({ where: { user_id: userId } })
  }
  
  public static getActiveUserTrackersByUserId(userId: string) {
    return this.findAll({ where: {
      user_id: userId,
      status: true,
    } });
  }
  
  public static getUserTrackerById(id: string) {
    return this.findOne({ where: { id: id } })
  }
  
  public static getUserTrackerByTrackerId(trackerId: string, userId?: string) {
    if (!userId) {
      return this.findOne({ where: { tracker_id: trackerId } })
    }
    return this.findOne({ where: { user_id: userId, tracker_id: trackerId } })
  }
  
  public static async createUserTracker(url: string, trackerId: string, serviceId: string, userId: string) {
    await this.create({
      url: url,
      status: true,
      tracker_id: trackerId,
      service_id: serviceId,
      user_id: userId
    });
  }
  
  public static async updateUserTracker(id: string, status: boolean) {
    await this.update(
      { status: status },
      {
        where: { id: id }
      }
    )
  }
  
  public static async deleteUserTracker(id: string) {
    await this.destroy({ where: { id: id } });
  }
}

User_Tracker.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
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
    },
    user_id: {
      type: DataTypes.CHAR(36),
      references: {
        model: User,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'user_trackers',
    freezeTableName: true,
  }
);

export default User_Tracker;