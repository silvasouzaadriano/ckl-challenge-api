import Sequelize, { Model } from 'sequelize';

class News extends Model {
  static init(sequelize) {
    super.init(
      {
        interest_id: Sequelize.INTEGER,
        banner_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        owner: Sequelize.STRING,
        owner_banner_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Interest, {
      foreignKey: 'interest_id',
      as: 'interest',
    });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsTo(models.File, {
      foreignKey: 'owner_banner_id',
      as: 'ownerbanner',
    });
  }
}

export default News;
