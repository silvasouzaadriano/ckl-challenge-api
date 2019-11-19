import Sequelize from 'sequelize';
import User from '../app/models/User';
import UserInterest from '../app/models/UserInterest';
import Interest from '../app/models/Interest';
import File from '../app/models/File';
import News from '../app/models/News';
import databaseConfig from '../config/database';

const models = [User, Interest, UserInterest, File, News];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
