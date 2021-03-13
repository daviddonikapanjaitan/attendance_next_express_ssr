'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_role.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_roles: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users_role',
  });
  return users_role;
};