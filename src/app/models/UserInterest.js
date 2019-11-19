import Sequelize, { Model } from 'sequelize';

class UserInterest extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        interest_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    this.belongsTo(models.Interest, {
      foreignKey: 'interest_id',
      as: 'interest',
    });
  }
}

export default UserInterest;
