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
        preview: false,
      },
      {
        restaurantId: 1,
        url: 'https://images.unsplash.com/photo-1563589173312-476d8c36b242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg',
        preview: false
      },
      {
        restaurantId: 1,
        url: 'https://billypenn.com/wp-content/uploads/2022/07/vanderwendes-icecream-03.jpg',
        preview: true,
      },
      {
        restaurantId: 1,
        preview: false,
        url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg'
      },
      {
        restaurantId: 1,
        preview: false,
        url: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60.jpg'
      },
      {
        restaurantId: 1,
        preview: false,
        url: 'https://images.unsplash.com/photo-1623595119708-26b1f7300075?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=683&q=80.jpg'
      },
      {
        restaurantId: 2,
        url: "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
        preview: true
      },
      {
        restaurantId: 2,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/ELKw_li71X4eKv8L35YoNA/348s.jpg'
      },
      {
        restaurantId: 2,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/gEVXQKtYrjNJpnt9MhhAMA/348s.jpg'
      },
      {
        restaurantId: 2,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/r5LHwjdD2paRtofMavBy2w/348s.jpg'
      },
      {
        restaurantId: 2,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/_9QksFLuDTwupmz3v58ZfA/348s.jpg'
      },
      {
        restaurantId: 2,
        preview: false,
        url: 'https://images.squarespace-cdn.com/content/v1/60a43c2e57b5c705f28324d3/1662178227173-FBLXL65O5XEZFYVM05NO/image-asset.jpeg'
      },
      {
        restaurantId: 3,
        url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        preview: false,
      },
      {
        restaurantId: 3,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/BXZ9Zs8F7rJcamsBv1fDDw/348s.jpg'
      },
      {
        restaurantId: 3,
        preview: false,
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/l08axLF2oSJNpQkkV6PWAA/l.jpg'
      },
      {
        restaurantId: 3,
        preview: false,
        url: 'https://www.islandtimefrozenyogurt.com/wp-content/uploads/2022/12/ice-cream-fernandina-beach-fl-1-640-520.jpg'

      },
      {

        restaurantId: 3,
        preview: false,
        url: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_800,h_400/https://discoverrichmondtours.com/wp-content/uploads/2021/06/Charm-School-2-e1624907204420.jpg'

      },
      {

        restaurantId: 3,
        preview: true,
        url: 'https://everylittlename.com/wp-content/uploads/2023/01/three-scoops-ice-cream.jpg'

      },
      {
        restaurantId: 4,
        url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
        preview: true,
      },
      {
        restaurantId: 4,
        preview: false,
        url: 'https://portsoyicecream.co.uk/site/wp-content/uploads/ice-cream-collection-1600x1067.jpg'

      },
      {
        restaurantId: 4,
        preview: false,
        url: 'https://www.thedailymeal.com/img/gallery/what-is-the-oldest-ice-cream-parlor-in-the-us/l-intro-1664213487.jpg'
      },
      {
        restaurantId: 4,
        preview: false,
        url: 'https://portsoyicecream.co.uk/site/wp-content/uploads/ice-cream-collection-1600x1067.jpg'

      },
      {
        restaurantId: 4,
        preview: false,
        url: 'https://portsoyicecream.co.uk/site/wp-content/uploads/ice-cream-collection-1600x1067.jpg'

      },
      {
        restaurantId: 4,
        preview: false,
        url: 'https://www.stayincocoabeach.com/wp-content/uploads/2019/03/Sweeties-1.jpg'

      },
      {
        restaurantId: 5,
        url: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg",
        preview: false,
      },
      {
        restaurantId: 5,
        preview: false,
        url: 'https://restaurantdesign360.com/assets/static/content-img-63@2x.f71e539.b58a1943bb0b98c1835ca8c9254b0249.jpg'

      },
      {
        restaurantId: 5,
        preview: false,
        url: 'https://i.pinimg.com/originals/5a/ca/83/5aca83cf0eee16747dfc8e6683623b36.jpg'

      },
      {
        restaurantId: 5,
        preview: true,
        url: 'https://cdn.mos.cms.futurecdn.net/ManNov2ntFvFZNwVnbMJ3f.jpg'

      },
      {
        restaurantId: 5,
        preview: false,
        url: 'https://retaildesignblog.net/wp-content/uploads/2020/08/1-4-780x520.jpg'

      },
      {
        restaurantId: 5,
        preview: false,
        url: 'https://www.islandtimefrozenyogurt.com/wp-content/uploads/2020/08/ice-cream-shop-fernandina-beach-fl-3-scaled.jpg'

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
