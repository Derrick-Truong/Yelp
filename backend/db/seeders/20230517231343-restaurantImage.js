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
        url: "2b4e7d6a8f9c1e50c3f0b2d1895a6e7falex-robert-Xpt4_HgZSjw-unsplash.jpg"
      },
      {
        restaurantId: 1,
        url: '2b4e7d6a8f9c1e50c3f0b2d1895a6e7falp-allen-altiner-gdUSE2gJx14-unsplash.jpg',

      },
      {
        restaurantId: 1,
        url: '2b4e7d6a8f9c1e50c3f0b2d1895a6e7fbrianna-tucker-zPWnbj_xXE8-unsplash.jpg',

      },
      {
        restaurantId: 1,
        url: '2b4e7d6a8f9c1e50c3f0b2d1895a6e7fdylan-ferreira-0cv08T71zL0-unsplash.jpg'
      },
      {
        restaurantId: 1,
        url: '2b4e7d6a8f9c1e50c3f0b2d1895a6e7ferwan-hesry-kwrOLRHjxZc-unsplash.jpg'
      },
      {
        restaurantId: 1,
        url: '2b4e7d6a8f9c1e50c3f0b2d1895a6e7feugene-zhyvchik-oieodYZhMEQ-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: "d2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7alex-robert-Xpt4_HgZSjw-unsplash (1).jpg",

      },
      {
        restaurantId: 2,
        url: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7handy-wicaksono-grFOVo_kEEQ-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7jeswin-thomas-x2iJB6i4u0A-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7katie-smetherman-etr1gzkVpuQ-unsplash.jpg'
      },
      {
        restaurantId: 2,
        url: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7nick-karvounis-7sf0vmckvz4-unsplash (1).jpg'
      },
      {
        restaurantId: 2,
        url: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7sincerely-media-udbcIP_f6kA-unsplash (1).jpg'
      },
      {
        restaurantId: 3,
        url: "7e83f92d5a1c6b8f4d0e97b65c32a1f7mister-james-_5VeIJiqFK4-unsplash.jpg",
      },
      {
        restaurantId: 3,
        url: '7e83f92d5a1c6b8f4d0e97b65c32a1f7najlacam-f8TajCVv4s8-unsplash.jpg'
      },
      {
        restaurantId: 3,
        url: '7e83f92d5a1c6b8f4d0e97b65c32a1f7paulina-ponce-Z0ZvJwk8ZoY-unsplash.jpg'
      },
      {
        restaurantId: 3,
        url: '7e83f92d5a1c6b8f4d0e97b65c32a1f7photo-1473213110592-19430a217c0e.avif'

      },
      {

        restaurantId: 3,
        url: '7e83f92d5a1c6b8f4d0e97b65c32a1f7photo-1560008581-09826d1de69e.avif'

      },
      {

        restaurantId: 3,
        url: '7e83f92d5a1c6b8f4d0e97b65c32a1f7photo-1560269507-9495cdfcadca.avif'

      },
      {
        restaurantId: 4,
        url: "f1a0c8b7e9d4621530b46d34e62ef9c2photo-1560801530-34efebfecba8.avif",
      },
      {
        restaurantId: 4,
        url: 'f1a0c8b7e9d4621530b46d34e62ef9c2photo-1582076653774-5476ea5db60e.avif'

      },
      {
        restaurantId: 4,
        url: 'f1a0c8b7e9d4621530b46d34e62ef9c2photo-1597041505347-26a27f87b914.avif'
      },
      {
        restaurantId: 4,
        url: 'f1a0c8b7e9d4621530b46d34e62ef9c2photo-1602296750425-f025b045f355.avif'

      },
      {
        restaurantId: 4,
        url: 'f1a0c8b7e9d4621530b46d34e62ef9c2photo-1602296751203-b9aa27fe9426.avif'

      },
      {
        restaurantId: 4,
        url: 'f1a0c8b7e9d4621530b46d34e62ef9c2photo-1602296751259-edfb8274b682.avif'

      },
      {
        restaurantId: 5,
        url: "8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1637695282790-ddfb2d7c90b9.avif",
      },
      {
        restaurantId: 5,
        url: '8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1640184713819-69d3195f0b92.avif'

      },
      {
        restaurantId: 5,
        url: '8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1641417670713-1a0023152194.avif'

      },
      {
        restaurantId: 5,
        url: '8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1650155585218-ee113644a333.avif'
      },
      {
        restaurantId: 5,
        url: '8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1656218505247-4fa1f2a6684a.avif'

      },
      {
        restaurantId: 5,
        url: '8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5photo-1680448934566-f3021ce20c91.avif'

      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "RestaurantImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: {
        [Op.in]: [[1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,5,  5, 5, 5, 5, 5]]
      }
    }, {});
  }
};
