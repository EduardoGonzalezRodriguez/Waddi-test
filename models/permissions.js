'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  permissions.init({
    idUser: DataTypes.INTEGER,
    getPosts: DataTypes.BOOLEAN,
    createPosts: DataTypes.BOOLEAN,
    deletePost: DataTypes.BOOLEAN,
    updatePosts: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};