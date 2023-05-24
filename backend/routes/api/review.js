const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateReviewImage, validateRestaurant } = require('../../utils/validation.js')
const { sequelize, Op } = require('sequelize')
const { Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models')



router.put('/:id', requireAuth, validateReview, async(req, res, next) => {
    let {description, rating} = req.body
    let updateReview = await Review.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!updateReview) {
        return res.json({
            message: "Review could not be found"
        })
    }

    if (updateReview.userId !== req.user.id) {
        return res.json({
            message: "Forbidden/not allowed"
        })
    }
    let success = await updateReview.update({
       description,
       rating
    })
    res.json(success)
})

//create image for a review
router.post('/:id/pictures', requireAuth, validateReviewImage, async(req, res, next) => {
    const {url} = req.body
    let findReview = await Review.findOne({
        where: {
            id: req.params.id
        },
        include:{
            model:ReviewImage
        }

    })

    if (!findReview) {
        return res.json({
            message: "Review could not be found"
        })
    }
    if(req.user.id !== findReview.userId){
          res.json({
            message: "Forbidden/not allowed"
        })
    }
    let findImage = await ReviewImage.findOne({
        where: {
            reviewId: req.params.id
        }
    })

    if (findImage) {
        return res.json({
            message: "Review already has an image associated with it"
        })
    }

    let success = await findReview.createReviewImage({
        reviewId: findReview.id,
        url: url
    })
    res.json({
        success
    })
})

router.delete('/:id', requireAuth, async(req, res, next) => {
    let deleteReview = await Review.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!deleteReview) {
        return res.json({
            message: "Review could not be found"
        })
    }

    if (deleteReview.userId !== req.user.id) {
        return res.json({
            message: "Forbidden/not allowed"
        })
    }

   await deleteReview.destroy()

   return res.json({
    message: 'Review successfully deleted'
   })
})














module.exports = router;
