import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db/models/index';
import User from '@/db/models/User';

class Account extends Model {}

Account.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    provider: { type: DataTypes.STRING, allowNull: false },
    provider_account_id: { type: DataTypes.STRING, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: false },
    access_token: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.INTEGER, allowNull: false },
    token_type: { type: DataTypes.STRING, allowNull: false },
    scope: { type: DataTypes.STRING, allowNull: false },
    id_token: { type: DataTypes.STRING, allowNull: false },
    session_state: { type: DataTypes.STRING, allowNull: false },
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
    modelName: 'accounts',
    freezeTableName: true,
  }
);

export default Account;