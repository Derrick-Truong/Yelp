'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.User,
        {
          foreignKey: 'userId',

        }
      );
      Review.belongsTo(
        models.Restaurant,
        {
          foreignKey: 'restaurantId',

        }
      );
      Review.hasOne(
        models.ReviewImage,
        {
          foreignKey: 'reviewId',
          
        }
      )

      // define association here
    }
  }
  Review.init({
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
