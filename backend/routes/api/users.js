const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();

// async function prepareData() {
//     try {
//         console.log('Restaurant', Restaurant)

//         const restaurantData = await Restaurant.findAll();
//         const restaurantImageData = await RestaurantImage.findAll();
//         const reviewData = await Review.findAll();
//         const reviewImageData = await ReviewImage.findAll();
//         const userData = await User.findAll();

//         return {
//             Restaurant: restaurantData,
//             RestaurantImage: restaurantImageData,
//             Review: reviewData,
//             ReviewImage: reviewImageData,
//             User: userData
//         };
//     } catch (error) {
//         console.error('Error while preparing data:', error);
//         throw error;
//     }
// }

// prepareData()
//     .then((data) => {
//         console.log(JSON.stringify(data));
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password'),
    handleValidationErrors
];
// Sign up
router.post(
    '/', validateSignup,
    async (req, res) => {
        const { email, username, password, firstName, lastName } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ firstName, lastName, email, username, hashedPassword });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
