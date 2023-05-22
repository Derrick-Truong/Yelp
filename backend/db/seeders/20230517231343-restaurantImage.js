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
        url: "https://images.unsplash.com/photo-1625758600922-4085dd859395?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg",
        preview: true
      },
      {
        restaurantId: 2,
        url: "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
        preview: true
      },
      {
        restaurantId: 3,
        url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        preview: true
      },
      {
        restaurantId: 4,
        url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
        preview: true
      },
      {
        restaurantId: 5,
        url: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg",
        preview: true
      },
      {
      restaurantId: 1,
        url: 'https://images.unsplash.com/photo-1563589173312-476d8c36b242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg',
        preview: false
      },
      {
        restaurantId: 1,
        preview: false,
        url:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg'
      },
      {
        restaurantId: 1,
        preview: false,
        url:'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg'
      },
      {
        restaurantId: 1,
        preview: false,
        url:'https://images.unsplash.com/photo-1623595119708-26b1f7300075?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=683&q=80.jpg'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "RestaurantImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://images.unsplash.com/photo-1623595119708-26b1f7300075?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=683&q=80.jpg', 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg', 'https://images.unsplash.com/photo-1563589173312-476d8c36b242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg', "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg", "https://images.unsplash.com/photo-1625758600922-4085dd859395?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg", "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg", "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg", "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg"]
      }
    }, {});
  }
};
