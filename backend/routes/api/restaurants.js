const express = require('express');
const router = express.Router();
const multer = require('multer')
const { S3Client } = require("@aws-sdk/client-s3")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const sharp = require('sharp')
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateRestaurant } = require('../../utils/validation.js')
const { sequelize, Op } = require('sequelize')
const {Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models');


const crypto = require('crypto')
const randomGenerator = () => crypto.randomBytes(16).toString('hex')
const imageName = randomGenerator()
const DeleteObjectCommand = require("@aws-sdk/client-s3")
const {PutObjectCommand, GetObjectCommand, ListObjectsV2Command} = require("@aws-sdk/client-s3")
const dotenv = require('dotenv');
dotenv.config()
const secretKey = process.env.SECRET_KEY
const accessKey = process.env.ACCESS_KEY
const region = process.env.REGION
const bucket = process.env.BUCKET
// const fileUpload = require('express-fileupload');
// router.use(express.urlencoded({extended:true}))

// router.use(bodyParser.json({limit: '50mb'}))
// router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
router.use(bodyParser.json({ limit: '100mb' }));
const urlencodedParser = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
});

let s3 = new S3Client({
    credentials: {
        secretAccessKey: secretKey,
        accessKeyId: accessKey
    },
    region: 'us-west-1'
})
const storage = multer.memoryStorage();
// const storage = multer.memoryStorage()
const upload = multer({ storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Increase the limit to 10MB
 });



//Get all Restaurants
// router.get('/', async (req, res, next) => {

//     let restaurants = await Restaurant.findAll({

//         include: [
//             {
//                 model: Review,

//             },
//             {
//                 model: RestaurantImage,
//                 attributes:['id', 'preview', 'url']
//             },


//         ]

//     }
//     )
//     if (!restaurants) {
//         res.status(404);
//         return res.json({
//             message: "Restaurant couldn't be found",
//         })
//     }
//     let Restaurants = [];
//     restaurants.forEach(restaurant => {
//         Restaurants.push(restaurant.toJSON())
//         // spotArray.push(spot.toJSON())
//     })
//     Restaurants.forEach(restaurant => {
//         let adder = 0;
//         let i = 0;

//         restaurant.Reviews.forEach(review => {
//             i++;
//             adder = adder + review.rating

//         })
//         restaurant.avgRating = adder / i;
//        restaurant.previewImage = restaurant.RestaurantImages[0].url


//         delete restaurant.Reviews


//     });


//     res.json({Restaurants})
// })





//get details of a spot

// router.get('/:id', async(req, res, next) => {
//     let oneRestaurant = await Restaurant.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//             model:Review,
//             attributes:['id', 'description', 'rating'],
//             include:{
//                 model:ReviewImage,
//                 attributes:['id', 'url']
//             }
//             },
//             {
//                 model:User,
//                 attributes:['id', 'firstName', 'lastName', 'username']
//             },
//             {
//                 model:RestaurantImage


//             }
//         ],


//         }
//     )



//     if (!oneRestaurant) {
//         return res.json({
//             message: "Restaurant couldn't be found",
//             statusCode: 404
//         })
//     }

//     let adder = 0;
//     let restaurantDetails = oneRestaurant.toJSON()
//     restaurantDetails.numReviews = oneRestaurant.Reviews.length
//     restaurantDetails.Reviews.forEach(review => {
//         adder = adder + review.rating

//     })
//     restaurantDetails.avgRating = adder / restaurantDetails.numReviews
//     delete restaurantDetails.Reviews
//     restaurantDetails.previewImage = restaurantDetails.RestaurantImages[0].url

//     // if (restaurantDetails.RestaurantImages.length > 1) {
//     //     if (restaurantDetails.RestaurantImages[0].id !== restaurantDetails.RestaurantImages[1].id) {
//     //         for (let i = 1; i < restaurantDetails.RestaurantImages.length; i++) {
//     //             restaurantDetails.RestaurantImages[i].preview = false
//     //         }
//     //     }
//     // }


//     res.json(restaurantDetails)
//     }

//     )



//Create a Restaurant


//Create an Image for a Restaurant
// router.post('/upload', async (req, res, next) => {
//     AWS.config.update({
//         accessKeyId:'AKIA4JAUV7C4S32ITJPB',
//         secretAccesskey: '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',
//         region:'us-west-1'

//     })

//     const s3 = new AWS.S3();

//     const fileContent = Buffer.from(req.files.data.data, 'binary');

//     const params = {
//         Bucket: 'yelp-capstone',
//         Key: req.files.data.name,
//         Body: fileContent
//     }

//     s3.upload(params, (err, data) => {
//         if(err){
//             throw err;
//         }
//         return res.json({
//             'message': "Success",
//             'statusCode': 200,
//             'data': data
//         })

//     })
// })



//get



//get all restaurants
router.get('/', async (req, res, next) => {
    try {
        let restaurants = await Restaurant.findAll({
            include: [
                {
                    model: Review,
                },
                {
                    model: RestaurantImage
                }
            ],
        });

        if (!restaurants) {
            res.status(404);
            return res.json({
                message: "Restaurant couldn't be found",
            });
        }

        let Restaurants = [];
        restaurants.forEach(restaurant => {
            Restaurants.push(restaurant.toJSON())
        });

        Restaurants.forEach(restaurant => {
            let adder = 0;
            let i = 0;

            restaurant.Reviews.forEach(review => {
                i++;
                adder = adder + review.rating;
            });

            restaurant.avgRating = adder / i;

            if (restaurant.RestaurantImages.length > 0) {
                const mostRecentImage = restaurant.RestaurantImages.reduce((prevImage, currImage) => {
                    if (new Date(currImage.createdAt) > new Date(prevImage.createdAt)) {
                        return currImage;
                    } else {
                        return prevImage;
                    }
                });

                restaurant.previewImage = mostRecentImage.url;
            }

            delete restaurant.Reviews;
            delete restaurant.RestaurantImages;
        });

        res.json({Restaurants});
    } catch (error) {
        next(error);
    }
});
//         delete restaurant.Reviews
        // for (const restaurant of restaurants) {
        //     let restaurantDetails = restaurant.toJSON();

        //     let adder = 0;
        //     let i = 0;

        //     restaurantDetails.Reviews.forEach((review) => {
        //         i++;
        //         adder = adder + review.rating;
        //     });

        //     restaurantDetails.avgRating = adder / i;
        //     delete restaurantDetails.Reviews;

//            const params4 = {
//   Bucket: process.env.BUCKET,
//   MaxKeys: 6,
//   Prefix: restaurantDetails.randomNum,
// };

// const getObjectPromises = [];
// const { Contents } = await s3.send(new ListObjectsV2Command(params4));

// if (Contents && Contents.length > 0) {
//   const sortedKeys = Contents.sort(
//     (a, b) => b.LastModified.getTime() - a.LastModified.getTime()
//   );
//   const lastModifiedKeys = sortedKeys.slice(0, 6).map((obj) => obj.Key);

//   for (const object of lastModifiedKeys) {
//     const getObjectParams = {
//       Bucket: params4.Bucket,
//       Key: object,
//     };

//     const response = await s3.send(new GetObjectCommand(getObjectParams));

//     getObjectPromises.push({
//       key: object,
//       data: response.Body.toString('utf-8'),
//     });
//   }

//   restaurantDetails.objects = await Promise.all(getObjectPromises);
//   restaurantDetails.previewImage = restaurantDetails.objects[0].key
//   delete restaurantDetails.objects
// }

// Restaurants.push(restaurantDetails);
//         }



router.get('/:id', async (req, res, next) => {
    try {
        let oneRestaurant = await Restaurant.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Review,
                    attributes: ['id', 'description', 'rating'],
                    include: {
                        model: ReviewImage,
                        attributes: ['id', 'url']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'username']
                },
                {
                    model:RestaurantImage
                }
            ]
        });

        if (!oneRestaurant) {
            return res.json({
                message: "Restaurant couldn't be found",
                statusCode: 404
            });
        }

        let adder = 0;
        let restaurantDetails = oneRestaurant.toJSON();
        restaurantDetails.numReviews = oneRestaurant.Reviews.length;

        restaurantDetails.Reviews.forEach(review => {
            adder = adder + review.rating;
        });

        restaurantDetails.avgRating = adder / restaurantDetails.numReviews;

        // const params4 = {
        //     Bucket: process.env.BUCKET,
        //     MaxKeys: 6,
        //     Prefix: restaurantDetails.randomNum
        // };

        // const getObjectPromises = [];
        // const { Contents } = await s3.send(new ListObjectsV2Command(params4));

        // if (Contents && Contents.length > 0) {
        //     const sortedKeys = Contents.sort((a, b) => b.LastModified.getTime() - a.LastModified.getTime());
        //     const lastModifiedKeys = sortedKeys.slice(0, 6).map(obj => obj.Key);

        //     for (const object of lastModifiedKeys) {
        //         const getObjectParams = {
        //             Bucket: params4.Bucket,
        //             Key: object
        //         };

        //         const response = await s3.send(new GetObjectCommand(getObjectParams));

        //         getObjectPromises.push({
        //             key: object,
        //             data: response.Body.toString('utf-8')
        //         });

        //         restaurantDetails.objects = await Promise.all(getObjectPromises);

        //     }
        //     // restaurantDetails.objects = await Promise.all(getObjectPromises);
        //     // restaurantDetails.objects = await Promise.all(getObjectPromises);
        //     // res.json(restaurantDetails );
        //     // res.json(restaurantDetails);
        // }
        // restaurantDetails.objects = await Promise.all(getObjectPromises);

        res.json(restaurantDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
// router.post('/upload', upload.array('image', 6), async (req, res) => {
//     const { address, description, price, title, city, state, country } = req.body;
//     // const { image1, image2, image3, image4, image5, image6 } = req.files;

//     try {
//         const success = await Restaurant.create({
//             userId: req.user.id,
//             country,
//             state,
//             address,
//             city,
//             price,
//             title,
//             description,
//             randomNum: randomGenerator()
//         });

//         if (success) {
//             // const images = [image1, image2, image3, image4, image5, image6];

//             for (let i = 0; i < req.files.length; i++) {
//                 const file = req.files[i][0]; // Access the file from the array
//                 const fileBuffer = await sharp(file.buffer).resize({ width: 400, height: 370, fit: 'cover' }).toBuffer();

//                 const params = {
//                     Bucket: process.env.BUCKET,
//                     Key: success.randomNum + file.originalname,
//                     Body: fileBuffer,
//                     ContentType: file.mimetype,
//                     ACL: 'public-read'
//                 };

//                 const command = new PutObjectCommand(params);
//                 await s3.send(command);
//             }

//             console.log('Successfully loaded images');
//             return res.json(success);
//         }
//     } catch (error) {
//         console.error('Error occurred:', error);
//         return res.status(500).json({ error: 'An error occurred during image upload' });
//     }
// });
router.post('/upload', requireAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
    { name: 'image6', maxCount: 1 },
]), async (req, res) => {
    let s3 = new S3Client({
        credentials: {
            secretAccessKey: secretKey,
            accessKeyId: accessKey
        },
        region: 'us-west-1',
        bucket: 'icecreamfinder'
    })
    try {
        // if (!req.files) {
        //     return res.status(400).json({ error: 'No files were uploaded' });
        // }

        const { image1, image2, image3, image4, image5, image6 } = req.files;
        const { address, description, price, title, city, state, country } = req.body;

        const success = await Restaurant.create({
            userId: req.user.id,
            country,
            state,
            address,
            city,
            price,
            title,
            description
        });

            const images = [image1, image2, image3, image4, image5, image6];
        if(images && images.length > 0){
            for (let i = 0; i < images.length; i++) {
                const file = images[i] ? images[i][0] : null; // Access the file from the array if it exists

                if (file) {
                    const fileBuffer = await sharp(file.buffer).resize({ width: 400, height: 370, fit: 'cover' }).toBuffer();
                    const newPic = await success.createRestaurantImage({
                        restaurantId: success.id,
                        url: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                    })

                    // const params = {
                    //     Bucket: process.env.BUCKET,
                    //     Key: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                    //     Body: fileBuffer,
                    //     ContentType: file.mimetype
                    // };
                    const params = {
                        Bucket: bucket,
                        Key: newPic.url,
                        Body: fileBuffer,
                        ContentType: file.mimetype
                    };

                    const command = new PutObjectCommand(params);
                    await s3.send(command);
                    console.log('Successfully loaded images');
                    // res.json(newPic)
                    // let userIdString = success.userId.toString()
                    // let restaurantIdString = success.id.toString()
                    // res.json(success);
                    // await RestaurantImage.create({
                    //     restaurantId: success.id,
                    //     url: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                    // })
                    // await success.createRestaurantImage({
                    //     restaurantId: success.id,
                    //     url: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                    // })
                }


            }


        }
    // return res.json(success)
        // res.json(success)
        return res.json(success)
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred during image upload' });
    }
});

//create restaurant with associated images then upload to bucket
// router.post('/upload', upload.fields([
//     { name: 'image1', maxCount: 1 },
//     { name: 'image2', maxCount: 1 },
//     { name: 'image3', maxCount: 1 },
//     { name: 'image4', maxCount: 1 },
//     { name: 'image5', maxCount: 1 },
//     { name: 'image6', maxCount: 1 },
// ]), async (req, res) => {
//     // Access the uploaded files using req.files
//     const { image1, image2, image3, image4, image5, image6 } = req.files;
//     console.log('body', req.body)
//     console.log('files', req.files)

//         // if (!req.body || !req.files) {
//         //     throw new Error('Invalid request payload');
//         // }

//         // const address = req.body.address;
//         // const description = req.body.description;
//         // const price = req.body.price;
//         // const title = req.body.title;
//         // const city = req.body.city;
//         // const state = req.body.state;
//         // const country = req.body.country;
//         const { address, description, price, title, city, state, country} = req.body

//         const success = await Restaurant.create({
//             userId: req.user.id,
//             country,
//             state,
//             address,
//             city,
//             price,
//             title,
//             description,
//             randomNum: randomGenerator()
//         });

//         if (success) {
//             for (let i = 0; i < req.length; i++) {
//                 const file = req.files[i];
//                 const fileBuffer = await sharp(file.buffer).resize({ width: 400, height: 370, fit: 'cover' }).toBuffer();

//                 const params = {
//                     Bucket: process.env.BUCKET,
//                     Key: success.randomNum + file.originalname,
//                     Body: fileBuffer,
//                     ContentType: file.mimetype,
//                     ACL: 'public-read'
//                 };

//                 const command = new PutObjectCommand(params);
//                 await s3.send(command);
//             }

//             console.log('Successfully loaded images');
//             return res.json(success);

//     }

// });





//Edit Restaurant
router.put('/:id', requireAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
    { name: 'image6', maxCount: 1 },
]), async (req, res) => {
    let s3 = new S3Client({
        credentials: {
            secretAccessKey: secretKey,
            accessKeyId: accessKey
        },
        region: 'us-west-1'
    })
    try {
        let success = await Restaurant.findOne({
            where: {
                id: req.params.id
            },
            inclde:[
                {
                    model: RestaurantImage
                }
            ]
        })
        if (!req.files) {
            return res.status(400).json({ error: 'No files were uploaded' });
        }

        const { image1, image2, image3, image4, image5, image6 } = req.files;
        const { address, description, price, title, city, state, country } = req.body;

        success.update({
            country,
            state,
            address,
            city,
            price,
            title,
            description
        });
        const images = [image1, image2, image3, image4, image5, image6];
        if (success && images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const file = images[i] ? images[i][0] : null; // Access the file from the array if it exists

                if (file) {
                    const fileBuffer = await sharp(file.buffer).resize({ width: 400, height: 370, fit: 'cover' }).toBuffer();

                    const params = {
                        Bucket: process.env.BUCKET,
                        Key: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                        Body: fileBuffer,
                        ContentType: file.mimetype
                    };

                    const command = new PutObjectCommand(params);
                    await s3.send(command);
                    console.log('Successfully loaded images');

                    // res.json(success);
                    await RestaurantImage.create({
                        restaurantId: success.id,
                        url: success.userId.toString() + req.user.username + success.id.toString() + file.originalname,
                    })

                }


            }

            // console.log('Successfully loaded images');
        }
        res.json(success)
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred during image upload' });
    }
});

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
    let restaurant = await Restaurant.findByPk(req.params.id)

    if (!restaurant) {
        return res.json({
            message: "Restaurant couldn't be found",
            statusCode: 404
        })
    }

    let reviewList = await Review.findAll({
        where: {
            restaurantId: restaurant.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes:['id','url']



            }
        ]
    })
    if (!reviewList){
        return res.json({
            message: "Reviews couldn't be found",
            statusCode: 404
        })
    }
    let Reviews = []
    reviewList.forEach(review => {
        Reviews.push(review.toJSON())
    })

    Reviews.forEach(review => {
        if(review.ReviewImage){
        review.previewImage = review.ReviewImage.url
        delete review.ReviewImage
        }


    })



//    reviewList.ReviewImage.forEach(image => {
//     if (image.url){
//         reviewList.previewImage = image.url
//     }
//    })
    // let Reviews = []
    // reviewList.forEach(review => {
    //     Reviews.push(review.toJSON())
    // })
    // Reviews.forEach(review => {
    //     review.ReviewImages.forEach(image => {
    //         if (image.url) {
    //             review.previewImage = image.url
    //         }
    //     })

    // })
    // delete Reviews.ReviewImaged

  res.json({Reviews})

})

//Create review for a Restaurant
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
