'use strict';

/** @type {import("sequelize-cli").Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'RestaurantImages';
    return queryInterface.bulkInsert(options, [
      {
        restaurantId: 1,
        url: "1Demo1alex-robert-Xpt4_HgZSjw-unsplash+(1).jpg"
      },
      {
        restaurantId: 1,
        url: '1Demo1brianna-tucker-zPWnbj_xXE8-unsplash (1).jpg',

      },
      {
        restaurantId: 1,
        url: '1Demo1dylan-ferreira-0cv08T71zL0-unsplash+(1).jpg',

      },
      {
        restaurantId: 1,
        url: '1Demo1erwan-hesry-kwrOLRHjxZc-unsplash+(1).jpg'
      },
      {
        restaurantId: 1,
        url: '1Demo1erwan-hesry-kwrOLRHjxZc-unsplash (1).jpg'
      },
      {
        restaurantId: 1,
        url: '1Demo1eugene-zhyvchik-oieodYZhMEQ-unsplash+(1).jpg'
      },
      {
        restaurantId: 2,
        url: "2Bill2alex-robert-Xpt4_HgZSjw-unsplash (2).jpg",

      },
      {
        restaurantId: 2,
        url: '2Bill2bill-alexy-1vDN-XW6yow-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: '2Bill2dylan-ferreira-0cv08T71zL0-unsplash (2).jpg'
      },
      {
        restaurantId: 2,
        url: '2Bill2emmy-gaddy-wkjODwoMV88-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: '2Bill2erwan-hesry-OlQ-NaEyVmQ-unsplash (1).jpg'
      },
      {
        restaurantId: 2,
        url: '2Bill2eugene-zhyvchik-PtndqvBs8ls-unsplash.jpg'
      },
      {
        restaurantId: 3,
        url: "3Derrick3ferran-feixas-_T3cl6Wuc2U-unsplash (1).jpg",
      },
      {
        restaurantId: 3,
        url: '3Derrick3ferran-feixas-_T3cl6Wuc2U-unsplash.jpg'
      },
      {
        restaurantId: 3,
        url: '3Derrick3handy-wicaksono-grFOVo_kEEQ-unsplash (1).jpg'
      },
      {
        restaurantId: 3,
        url: '3Derrick3heather-barnes-bqafVjHkcAQ-unsplash.jpg'

      },
      {

        restaurantId: 3,
        url: '3Derrick3jason-leung-BxkMhxgdOh8-unsplash (1).jpg'

      },
      {

        restaurantId: 3,
        url: '3Derrick3jason-leung-BxkMhxgdOh8-unsplash (2).jpg'

      },
      {
        restaurantId: 4,
        url: "1Demo4jeswin-thomas-TyV8uETpfOg-unsplash(1).jpg",
      },
      {
        restaurantId: 4,
        url: '1Demo4katie-smetherman-etr1gzkVpuQ-unsplash (2).jpg'

      },
      {
        restaurantId: 4,
        url: '1Demo4katie-smetherman-etr1gzkVpuQ-unsplash(1).jpg'
      },
      {
        restaurantId: 4,
        url: '1Demo4katie-smetherman-j7hiE_Ob0do-unsplash.jpg'

      },
      {
        restaurantId: 4,
        url: '1Demo4kawai-so-hLGIWfPsVJs-unsplash(1).jpg'

      },
      {
        restaurantId: 4,
        url: '1Demo4kenta-kikuchi-LZ6BTZnizD8-unsplash.jpg'

      },
      {
        restaurantId: 5,
        url: "2Bill5megan-lee-IydLHeNaFuw-unsplash.jpg",
      },
      {
        restaurantId: 5,
        url: '2Bill5narate-vongserewattana-7iVg2gj2BVQ-unsplash (1).jpg'

      },
      {
        restaurantId: 5,
        url: '2Bill5narate-vongserewattana-7iVg2gj2BVQ-unsplash.jpg'

      },
      {
        restaurantId: 5,
        url: '2Bill5narate-vongserewattana-7iVg2gj2BVQ-unsplash.jpg'
      },
      {
        restaurantId: 5,
        url: '2Bill5nick-karvounis-7sf0vmckvz4-unsplash (1).jpg'

      },
      {
        restaurantId: 5,
        url: '2Bill5nick-karvounis-7sf0vmckvz4-unsplash (2).jpg'

      },

    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "RestaurantImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: {
        [Op.in]: [[1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,5,  5, 5, 5, 5, 5]]
      }
    }, options);
  }
};
