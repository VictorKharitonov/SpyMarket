import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db/models/index';

class VerificationToken extends Model {}

VerificationToken.init(
  {
    identifier: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    token: { type: DataTypes.STRING, allowNull: false },
    expires: { type: DataTypes.TIME, allowNull: false },
  },
  {
    sequelize,
    modelName: 'verification_tokens',
    freezeTableName: true,
  }
);

export default VerificationToken;