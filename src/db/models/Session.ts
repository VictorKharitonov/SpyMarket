import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db/models/index';
import User from '@/db/models/User';

class Session extends Model {}

Session.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    expires: { type: DataTypes.TIME, allowNull: false },
    session_token: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.CHAR(36),
      references: {
        model: User,
        key: 'id'
      },
    },
  },
  {
    sequelize,
    modelName: 'sessions',
    freezeTableName: true
  }
);

export default Session;