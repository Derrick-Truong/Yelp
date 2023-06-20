import { csrfFetch } from "./csrf";


const ALL_RESTAURANTS = 'restaurants/allRestaurants';
const CREATE_RESTAURANT = 'restaurants/createRestaurant'
const UPDATE_RESTAURANT = 'restaurants/updateRestaurants'
const DELETE_RESTAURANT = 'restaurants/deleteRestaurant'
const ONE_RESTAURANT = 'restaurants/oneRestaurant'


const homeRestaurants = (restaurants) => {
return {
    type: ALL_RESTAURANTS,
    restaurants
}
}

const updateRestaurant = (restaurant) => {
    return {
        type: UPDATE_RESTAURANT,
        restaurant
    }
}

export const deleteRestaurant = (restaurantId) => {
    return {
        type: DELETE_RESTAURANT,
        restaurantId
    }
}

const createOneRestaurant = (restaurant) => {
    return {
        type: CREATE_RESTAURANT,
        restaurant
    }
}

const getRestaurantDetails = (restaurant) => {
    return {
        type: ONE_RESTAURANT,
        restaurant
    }
}


export const getRestaurants = () => async dispatch => {
    const response = await fetch('/api/restaurants')
    if (response.ok) {
        const list = await response.json();
     dispatch(homeRestaurants(list))
    }
};

export const restaurantDetails = (restaurantId) => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurantId}/`)

    if (response.ok) {
        const res = await response.json()
       dispatch(getRestaurantDetails(res))
    }
}
// export const updateOneRestaurant = (restaurant, restaurantId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/restaurants/${restaurantId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'multipart/form-data'},
//         body: JSON.stringify(restaurant)
//     })

    // if (res.ok) {
    //     const newRestaurant = await res.json()
    //     newRestaurant.RestaurantImages = []
    //     for (let i = 0; i < restaurantPictures.length; i++) {
    //         const response2 = await csrfFetch(`/api/restaurants/${restaurantId}/pictures`, {
    //             method: 'PUT',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(restaurantPictures[i])
    //         })


    //         if (response2.ok) {
    //             const newPicture = await response2.json()
    //             newRestaurant.RestaurantImages.push(newPicture)

    //         }


    //     }
    //     await dispatch(updateRestaurant(newRestaurant))
    //     return newRestaurant

//     if (res.ok){
//     const newRestaurant = await res.json()
//     await dispatch(updateRestaurant(newRestaurant))
//     return newRestaurant
//     }
// };

// export const submitData = (data) => async dispatch => {
//     const maxChunkSize = 1024; // Specify the maximum chunk size in bytes
//     const totalChunks = Math.ceil(data.length / maxChunkSize);

//     for (let i = 0; i < totalChunks; i++) {
//         const start = i * maxChunkSize;
//         const end = start + maxChunkSize;
//         const chunk = data.slice(start, end);

//         dispatch(createRestaurant(chunk));
//     }
// };
// export const createNewRestaurant = (formData) => async (dispatch) => {
//     console.log('Data backend', formData);
//     try {
//         const response = await csrfFetch('/api/restaurants/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Request failed with status ' + response.status);
//         }

//         const data = await response.json();
//         console.log('Response back end', data);
//         await dispatch(createOneRestaurant(data));
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle the error as needed
//     }
// };
export const updateOneRestaurant = (formData, restaurantId) => async (dispatch) => {
    console.log('Data store', formData)
    try {
        const response = await csrfFetch(`/api/restaurants/${restaurantId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
        const data = await response.json();
        dispatch(updateRestaurant(data));
        return data
        }
    } catch (error) {
        console.error('Error:Upload unsccessful', error);
        // Handle the error as needed
    }
};
export const createNewRestaurant = (formData) => async (dispatch) => {
    console.log('Data store', formData)
    try {
        const response = await csrfFetch('/api/restaurants/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            await dispatch(createOneRestaurant(data));
            return data
        }
    } catch (error) {
        console.error('Error:Upload unsccessful', error);
        // Handle the error as needed
    }
};

export const removeRestaurant = (restaurantId) => async dispatch => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteRestaurant(restaurantId));
    }
}


const initialState = {

}

const restaurantReducer = (prevState = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_RESTAURANTS:
            newState = {}
           action.restaurants.Restaurants.forEach(restaurant => {
            newState[restaurant.id] = restaurant
           })
           return newState
        case ONE_RESTAURANT:
            newState = {...prevState}
            newState[action.restaurant.id] = action.restaurant
            return newState
         case CREATE_RESTAURANT:
            newState = {...prevState}
            newState[action.restaurant.id] = action.restaurant
            return newState
        case UPDATE_RESTAURANT:
            newState = { ...prevState }
            newState[action.restaurant.id] = action.restaurant
            return newState
        case DELETE_RESTAURANT:
            newState = { ...prevState };
            delete newState[action.restaurantId];
            return newState;
        default: return prevState
    }
}

export default restaurantReducer
