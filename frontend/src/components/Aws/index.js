require("dotenv").config();
const AWS = require('aws-sdk');


let s3 = new AWS.S3({
    region: process.env.REGION,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
})


