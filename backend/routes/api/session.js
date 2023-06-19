// backend/routes/api/session.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
const router = express.Router();
// // backend/routes/api/session.js
// // ...

// // Log in
// router.post('/', validateLogin, async (req, res, next) => {

//     try {
//         console.log('req.body:', req.body);

//         const { credential, password } = req.body;

//         const user = await User.unscoped().findOne({
//             where: {
//                 [Op.or]: {
//                     username: credential,
//                     email: credential
//                 }
//             }
//         });

//         console.log('user:', user);
//         console.log('password:', password);

//         if (!user || (password !== user.password)) {
//             const err = new Error('Login failed');
//             err.status = 401;
//             err.title = 'Login failed';
//             err.errors = { credential: 'The provided credentials were invalid.' };
//             console.log('Error:', err);
//             return next(err);
//         }

//         const safeUser = {
//             id: user.id,
//             email: user.email,
//             username: user.username,
//         };

//         await setTokenCookie(res, safeUser);

//         console.log('safeUser:', safeUser);

//         return res.json({
//             user: safeUser
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         return next(error);
//     }
// });

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['Invalid credentials'];
            return next(err);
        }


        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    (req, res) => {
        const { user } = req;
        if (user) {
            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            };
            return res.json({
                user: safeUser
            });
        } else return res.json({ user: null });
    }
);



module.exports = router;
