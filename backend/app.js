const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const helmet = require('helmet');
// const multer = require('multer')
const cookieParser = require('cookie-parser');
// const storage = multer.memoryStorage()
// const crypt = require('crypto')

// const DeleteObjectCommand = require("@aws-sdk/client-s3")
// const PutObjectCommand = require("@aws-sdk/client-s3")
// const {S3Client} = require("@aws-sdk/client-s3")
// const dotenv = require('dotenv')
require('express-async-errors');
// backend/app.js
// dotenv.config()
// const upload = multer({ storage: storage })
// const randomGenerator = () => crypto.randomBytes(16).toString('hex')
const routes = require('./routes');
// const secretKey = process.env.SECRET_KEY
// const accessKey = process.env.ACCESS_KEY
// const region = process.env.REGION
// const bucket = process.env.BUCKET




// upload.single('avatar')
const isProduction = environment === 'production';



// const s3 = new S3Client({
//     credentials: {
//         secretAccessKey: secretKey,
//         accessKey: accessKey
//     },
//     region: 'us-west-1'
// })

const app = express();
app.use(express.json());



// app.post("/api/restaurants", upload.single('image'), async (req, res) => {
//     console.log("req.body", req.body)
//     console.log("req.file", req.file)

//     req.file.buffer

//     const params = {
//         Bucket: bucket,
//         Key: randomGenerator(),
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype
//     }
//     const command = new PutObjectCommand(params)
//     res.send({})

//     await s3.send(command)
//     const info = await
//         res.send({})
// })

// app.get("/list", async (req, res) => {
//     let result = await s3.listObjectsV2({ Bucket: bucket });
//     let contents = result.Contents.map(image => image.Key);
//     res.send(contents)
// })




// app.get("/api/uploads", async (req, res) => {
    // const images = await prisma.images.findMany({ orderBy: [{ created: 'desc' }] })


//     for (const image of images) {
//         image.imageUrl = "https://d1as0ypmpg9tx0.cloudfront.net/" + image.imageName
//     }
//     res.send(images)
// })

// app.delete("/api/uploads/:id", async (req, res) => {
//     const id = req.params.id


//     if (!image) {
//         res.status(404).send("Image not found")
//         return
//     }

//     const params = {
//         Bucket: bucket,
//         Key: image.imageName
//     }

//     const command = new DeleteObjectCommand(params)
//     await s3.send(command)

    // await prisma.images.delete({ where: { id } })

//     res.send({ image })

// })


app.use(morgan('dev'));

app.use(cookieParser());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);



// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes);

// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
// Connect all the routes
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});
// Phase 2 | Error Formatter Error-Handler | formatting all the errors b4 returning a JSON res
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});
// backend/app.js
// ...

// ...

// Process sequelize errors
// app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    // if (err instanceof ValidationError) {
    //     let errors = {};
    //     for (let error of err.errors) {
    //         errors[error.path] = error.message;
    //     }
    //     err.title = 'Validation error';
    //     err.errors = errors;
    // }
//     if (err instanceof ValidationError) {
//         err.errors = err.errors.map((e) => e.message)
//     }

//     next(err);
// });

// app.use((err, _req, res, _next) => {
//     res.status(err.status || 500);
//     console.error(err);
//     res.json({
//         title: err.title || 'Server Error',
//         message: err.message,
//         errors: err.errors,
        // stack: isProduction ? null : err.stack
//     });
// });


// backend/app.js
// ...

module.exports = app;
