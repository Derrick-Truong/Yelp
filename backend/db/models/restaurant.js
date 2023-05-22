'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasMany(
        models.RestaurantImage,
        { foreignKey: 'restaurantId', onDelete: 'CASCADE', hooks: true }
      );

      Restaurant.hasMany(
        models.Review,
        { foreignKey: 'restaurantId', onDelete: 'CASCADE', hooks: true }
      );

      Restaurant.belongsTo(
        models.User,
        {
          foreignKey:'userId'
        }
      )
      // define association here
    }
  }
  Restaurant.init({
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
