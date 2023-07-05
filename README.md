# Ice Cream Delight

Ice Cream Delight is a site that helps users find the perfect ice cream shop for them. The site ranks the ice cream shops from highest to lowest rated based on customer reviews of the listing. Its purpose and features are similar to the website Yelp.

## Technologies Used

The following technologies were used to develop DrBnb:

- **Node.js**: A server-side runtime environment that enabled us to build scalable and high-performance applications.
- **React**: A JavaScript library that helped us create a dynamic and responsive user interface.
- **Redux**: A predictable state container that helped us manage complex application state across components.
- **SQLAlchemy**: An Object-Relational Mapping (ORM) library that provided a high-level interface for working with our PostgreSQL database.
- **PostgreSQL**: A powerful open-source relational database that provided a robust and scalable data storage solution.
- **GoogleMapsAPI**: Google Maps API is a powerful geolocation and mapping service that enables developers to integrate interactive maps, geocoding, and location-based functionality into their applications.
- **AWS**:AWS is a comprehensive cloud computing platform provided by Amazon, offering a wide range of scalable and cost-effective services for hosting, storage, data management, machine learning, and more, empowering developers to build and deploy applications with high availability and scalability.
  
## Features

**Account Management**
   - Users can create a new account, log in, and log out.
   - A demo login option is available for users to try the site without creating an account.
   - Certain features are restricted to logged-in users, such as posting reviews and favoriting shops.
   - Upon logging in, users are directed to the home page, which displays a feed of ice cream shop listings.
   - Logged out users can still view the listings feed but with limited privileges.
     
   ![ice-login](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/b04b9f0a-5bd8-4feb-91f9-ce382c55e5f9)

**Ice Cream Shops Feed**
   - Logged-in users can post listings for ice cream shops they have visited or owned.
   - Ice cream shops are ordered from highest to lowest rated (based off customer reviews)

   ![ice-feed](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/fd3d48c3-863b-410c-80bf-2eacf634b9a9)


### **Create a Shop**
- modal will open up the form to create a new shop 
- shop will display User of shop, name, description, price/night, shop images, shop rating, and any reviews associated with it
  
![ice-create-shop](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/f9a89049-1c7d-480d-865f-90eb23a73167)

### **Update/Delete a Shop**
- A modal opens and allows a user to delete a shop they created
- shop is removed from all pages it would be displayed on
- User can opt to cancel if they do not want to delete their shop
  
![ice-update](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/349b3d8b-d6de-44f1-9488-bad70f8965eb)

### **Reviews**
- Users are able to write a description and give a rating from 1-5 about a spot
- Users can edit a review if they want to change it
- Users can also delete their comment as well
  
![ice-review](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/067c3c08-91ed-4fee-91b0-e9571e864e88)

**Location and Directions**
- A map is provided of the location of each ice cream shop
- Users can get the directions between the ice cream shop and their current location
     
![ice-directions](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/f0db8b2f-5cd6-495b-b633-b33d659c109b)

<hr>

## Installation
-Clone the repository to your local machine.
-Install the required dependencies using the package manager of your choice (e.g., npm, yarn).

npm install --prefix backend
npm install --prefix frontend

Set up the necessary environment variables, such as API keys and database configurations.
Run the application locally or deploy it to a server.

<br>

## Code Snippet
### **Google Maps Directions**
Implementing the Google Maps API Directions functionality presented a challenge for our team. I needed to find a way to calculate and display directions between two locations on the map.

To overcome this, I first integrated the Google Maps API into our project and obtained the required API key. Then, I utilized the Directions service provided by the API to request directions based on the user's specified origin and destination.

Once I received the directions response, I extracted the relevant information such as step-by-step instructions, distance, and duration. I then parsed and formatted this data to present it in a user-friendly manner on our application's interface.

Additionally, I implemented interactive map markers to visualize the starting and ending points, along with the route between them. This allowed users to visually track their journey and interact with the map during the navigation process.

By combining the Google Maps API Directions service with our application's features, I successfully provided users with a seamless and intuitive way to access accurate and reliable directions for their desired routes.

![ice-snippet](https://github.com/Derrick-Truong/Ice-Cream-Delight/assets/111938093/bbabbc3b-662b-431b-8f69-393a8165b399)
