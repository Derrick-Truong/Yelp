const { spawn } = require('child_process');
const express = require('express');
const { Restaurant, RestaurantImage, Review, ReviewImage, User } = require('../../db/models');


// const pythonScript = spawn('python', ['python.py', 'arg1', 'arg2']);


// pythonScript.stdout.on('data', (data) => {
//     console.log(`Python script output: ${data}`);
// });

// pythonScript.stderr.on('data', (data) => {
//     console.error(`Python script error: ${data}`);
// });

async function prepareData() {
    try {
        const restaurantData = await Restaurant.findAll();
        const restaurantImageData = await RestaurantImage.findAll();
        const reviewData = await Review.findAll();
        const reviewImageData = await ReviewImage.findAll();
        const userData = await User.findAll();

        return {
            Restaurants: restaurantData,
            RestaurantImages: restaurantImageData,
            Reviews: reviewData,
            ReviewImages: reviewImageData,
            Users: userData
        };
    } catch (error) {
        console.error('Error while preparing data:', error);
        throw error;
    }
}

// Invoke the function to prepare the data and print it as JSON
prepareData()
    .then((data) => {
        console.log(JSON.stringify(data));
    })
    .catch((error) => {
        console.error('Error:', error);
    });

