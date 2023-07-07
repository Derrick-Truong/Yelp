 IceCreamFinder

Welcome to IceCreamFinder, a web application that allows users to discover and share their favorite ice cream shops. With IceCreamFinder, you can find delicious ice cream spots near you, leave reviews, and get directions to your favorite sweet treats.

Live link -> https://icecreamfinder.onrender.com/

<hr>

## Technologies Used

I utilized the following technologies to develop IceCreamFinder:

- Node.js: A server-side runtime environment that enabled us to build scalable and high-performance applications.
- React: A JavaScript library that helped us create a dynamic and responsive user interface.
- Redux: A predictable state container that helped us manage complex application state across components.
- Flask: A micro web framework that allowed us to build the backend of our application with Python.
- SQLAlchemy: An Object-Relational Mapping (ORM) library that provided a high-level interface for working with our PostgreSQL database.
- PostgreSQL: A powerful open-source relational database that provided a robust and scalable data storage solution.
- Google Maps API: Integrated the Google Maps API to display maps, locations, and directions for ice cream shops.
- AWS: Utilized Amazon Web Services (AWS) to store and manage user images, ensuring scalability and reliability.

<hr>

## Lesson Learned
During the development of IceCreamFinder, I learned the importance of user feedback and engagement. I actively sought feedback from ice cream enthusiasts, which helped us understand the features and improvements they desired in an ice cream shop discovery platform. Regular user testing and iteration allowed us to create a user-friendly experience that meets the needs of our target audience.

I also gained valuable experience in integrating third-party APIs like the Google Maps API. This integration allowed us to provide accurate geolocation information and directions to ice cream shops, enhancing the user experience and making it easier for users to find their way to their favorite spots.

Overall, IceCreamFinder was a collaborative effort that taught us the significance of understanding our users and leveraging powerful tools and APIs to create an engaging and valuable application.

<hr>

## Features
IceCreamFinder offers a range of features designed to enhance the ice cream discovery and sharing experience. Here are the main features I implemented:

### Log In / Sign Up
- Secure user authorization using hashing for password protection.
- Displaying user login/sign-up errors in the respective forms.
- Demo user provided for testing purposes.

### Ice Cream Shop Feed
- Displaying a feed of ice cream shops shared by users.
- Users can scroll through the carousel of ice cream shops and click on any of them that will navigate them to each shop's detail page.

![ice-feed](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/a63c4838-3ae4-4ba4-9ddd-e6d3a4c790de)

### Create Ice Cream Shop
- Users can create and share new ice cream shops.
- A form allows users to input details such as shop name, address, description, price, and images.
- Geolocation information is automatically fetched based on the provided address using the Google Maps API.

![ice-create-shop](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/4c9f9f2f-dec5-459c-81bb-29eb74ebe366)

### Update/Delete Ice Cream Shop
- Users can edit the details of ice cream shops they have shared.
- A modal allows users to make changes to the shop's information, including images.
- Users can also delete ice cream shops they have created.

![ice-update](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/7dab760e-f7e6-40bd-8d5c-bc83172e832f)

### Reviews
- Users can leave reviews and ratings for ice cream shops.
- Reviews include a text description and a rating score.
- Users can edit or delete their own reviews.

![ice-review](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/d2a60121-cc6a-4f34-af76-e3621f832ca8)

### Google Maps/Directions
- Integration of the Google Maps API allows users to view ice cream shop locations on a map.
- Users can get directions from their current location to a specific ice cream shop.

![ice-directions-new-part2](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/37b379e3-fe3b-4c01-a3ce-42f057584455)

### AWS
- Amazon Web Services (AWS) is used to store and manage user-uploaded images for ice cream shops.
- Images are securely stored and accessible for smooth browsing and retrieval.



<hr>

Code Snippet
Google Maps API Integration
One of the key features of IceCreamFinder is the integration of the Google Maps API to display ice cream shop locations and provide directions. I wanted to ensure a smooth user experience when interacting with the map.

Here's an example code snippet that demonstrates how I integrated the Google Maps API:

![ice-snippet](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/334454dd-7325-46a4-915d-500f96ce047a)
