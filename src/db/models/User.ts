import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/db/models/index';


class User extends Model {
  public static async getUserByEmail(email: string | undefined | null) {
    return await this.findOne({ where: { email: { [Op.eq]: email || '', } } });
  }
}

User.init(
  {
    id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    email_verified: { type: DataTypes.TIME, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
  }
);

export default User;