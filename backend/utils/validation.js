// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Validation error');
        err.errors = errors;
        err.title = 'Bad Request';
        err.status = 400;
        next(err);
  }
    // if (!validationErrors.isEmpty()) {
    //     const errors = {};
    //     validationErrors
    //         .array()
    //         .forEach(error => errors[error.param] = error.msg);

    //     const err = Error("Bad request.");
    //     err.errors = errors;
    //     err.status = 400;
    //     err.title = "Bad request.";
    //     next(err);
    // }
    next();
};






const validateReviewImage =[
    check('url')
    .isURL({checkfalsy: true})
    .notEmpty()
    .withMessage('Url must be a url'),
    handleValidationErrors
]
const validateReview = [
    check('description')
    .exists({checkfalsy: true})
    .notEmpty()
    .withMessage('Description is required'),
    check('rating')
    .exists({checkfalsey: true})
    .notEmpty()
    .withMessage('Rating between 1 and 5 is required.'),
    handleValidationErrors
]
const validateRestaurant = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('title')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 49})
        .withMessage("Title must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required"),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors, validateReviewImage, validateRestaurant, validateReview
};
