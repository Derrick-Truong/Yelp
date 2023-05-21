const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors, validateRestaurant } = require('../../utils/validation.js')
const { sequelize, Op } = require('sequelize')
const {Favorite, Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models')



//Get all Restaurants
router.get('/', async (req, res, next) => {

    let restaurants = await Restaurant.findAll({

        include: [
            {
                model: Review,
                include: [
                    {
                    model:ReviewImage
                    },
                    {
                    model:User,
                    attributes:['id', 'username']
                    }
                ]
            },
            {
                model: RestaurantImage
            },

        ]

    }
    )
    if (!restaurants) {
        res.status(404);
        return res.json({
            message: "Restaurant couldn't be found",
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
            if (review.ReviewImage.url) {
        restaurant.Reviews.previewImage = review.ReviewImage.url
            }
        })
        restaurant.avgRating = adder / i;
        restaurant.RestaurantImages.forEach(image => {
            if (image.url) {
                restaurant.previewImage = image.url
            }
        })




        delete restaurant.RestaurantImages
    });


    res.json({Restaurants})
})

//Create a Restaurant
router.post('/', [requireAuth, validateRestaurant],
    async (req, res, next) => {
        const {address, city, state, description, country, title, price} = req.body;

        const newRestaurant = await Restaurant.create({
            userId: req?.user?.id,
            country,
            city,
            address,
            title,
            description,
            price,
            state
        })

        res.json(newRestaurant)
    }


)

//Create an Image for a Restaurant
router.post('/:id/pictures', requireAuth, async(req,res, next) => {
let picture;
const {url, preview} = req.body
let newImage = await Restaurant.findOne({
    where: {
        id: req.params.id
    }
})

 if (!newImage) {
    res.status(404);
    return res.json({
        message:"Restaurant could not be found"
    })
 }

 if (newImage.userId !== req.user.id) {
     res.status(403);
     return res.json({
         message: "Forbidden/not allowed"
     })
 }
 picture = await newImage.createRestaurantImage({
    restaurantId: req.user.id,
    url,
    preview
 })
 res.json(picture)
})


//Edit Restaurant
router.put('/:id', requireAuth, validateRestaurant, async (req, res, next) => {
    let editRestaurant = await Restaurant.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!editRestaurant) {
        res.status(404);
        return res.json({
            message: "Restaurant couldn't be found",
        })
    }

    if (editRestaurant.userId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden/not allowed",
        })
    }
    const { address, city, state, country, title, description, price } = req.body;

    editRestaurant.update({
        address,
        city,
        state,
        country,
        title,
        description,
        price
    })
    res.json(editRestaurant)
})

router.delete('/:id', requireAuth, async (req, res, next) => {
    let deleteRestaurant = await Restaurant.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!deleteRestaurant) {
        res.status(404);
        return res.json({
            message: "Restaurant couldn't be found",
        })
    }

    if (deleteRestaurant.userId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden/not allowed",
        })
    }

    await deleteRestaurant.destroy()
    res.json({
        message: "Successfully deleted",
        status: 200
    })
})


//Get reviews for a Restaurant

router.get('/:id/reviews', async(req, res, next) => {
    let restaurant = await Restaurant.findOne({
        where: {
            id: req.params.id
        }

    })

    if (!restaurant) {
        return res.json({
            message: "Restaurant couldn't be found",
            statusCode: 404
        })
    }

    let reviewList = await Review.findAll({
        where: {
            restaurantId: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let Reviews = []
    reviewList.forEach(review => {
        Reviews.push(review.toJSON())
    })

    res.json({Reviews})
})

router.post('/:id/reviews', requireAuth, async(req, res, next) => {
    const {rating, description} = req.body
    let restaurant = await Restaurant.findOne({
        where: {
            id: req.params.id
        }

    })

    if (!restaurant) {
        return res.json({
            message: "Restaurant couldn't be found",
            statusCode: 404
        })
    }

    if (restaurant.userId === req.user.id) {
        return res.json({
            message: "Owners cannot write review on his/her own restaurant",
            statusCode: 403
        })
    }


    const createReview = await restaurant.createReview({
        rating: rating,
        description: description,
        userId: req.user.id,
        restaurantId: req.params.id

    })

    res.json(createReview)


})


module.exports = router;
