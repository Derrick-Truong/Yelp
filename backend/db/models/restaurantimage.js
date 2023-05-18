'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RestaurantImage.belongsTo(
        models.Restaurant,
        {
          foreignKey: 'restaurantId',
        }
      )

      // define association here
    }
  }
  RestaurantImage.init({
    restaurantId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RestaurantImage',
  });
  return RestaurantImage;
};
