// backend/routes/api/index.js
// backend/routes/api/index.js

const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");
const { User } = require('../../db/models')
const { Restaurant } = require('../../db/models')
const { Review } = require('../../db/models')


const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewRouter = require('./review.js')
const restaurantsRouter = require('./restaurants.js')
const nodescriptRouter = require('./nodescript.js')
// const restaurantImagesRouter = require('./restaurantImage.js')

const { requireAuth } = require('../../utils/auth.js');

const { setTokenCookie } = require('../../utils/auth.js');

router.use(restoreUser);

// router.use('/pictures', restaurantImagesRouter)
router.use('/reviews', reviewRouter)
router.use('/restaurants', restaurantsRouter)
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


// GET /api/set-token-cookie


router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

// GET /api/restore-user




router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

// GET /api/require-auth

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

// backend/routes/api/index.js


// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null


module.exports = router;


