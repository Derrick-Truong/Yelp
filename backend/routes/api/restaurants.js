const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors, validateRestaurant } = require('../../utils/validation.js')
const { sequelize, Op } = require('sequelize')
const {Favorite, Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models')

router.get('/', async (req, res, next) => {

    let restaurants = await Restaurant.findAll({

        include: [
            {
                model: Review
            },
            {
                model: RestaurantImage
            }
        ]

    }
    )
    if (!restaurants) {
        return res.json({

        })
    }
    let Restaurants = [];
    restaurants.forEach(restaurant => {
        Restaurants.push(restaurant.toJSON())
        // spotArray.push(spot.toJSON())
    })
    Restaurants.forEach(restaurant => {
        let adder = 0;
        let i = 0;
        restaurant.Reviews.forEach(review => {
            i++;
            adder = adder + review.rating
        })
        restaurant.avgRating = adder / i;
        restaurant.RestaurantImages.forEach(image => {
            if (image.url) {
                restaurant.previewImage = image.url
            }
        })
        delete restaurant.Reviews
        delete restaurant.RestaurantImages
    });


    res.json({Restaurants})
})

router.post('/', [requireAuth, validateRestaurant],
    async (req, res, next) => {
        const {address, city, state, description, title, price} = req.body;


        const newRestaurant = await Restaurant.create({
            userId: req.user.id,
            country,
            city,
            address,
            title,
            description,
            price
        })
    }




)
module.exports = router;
