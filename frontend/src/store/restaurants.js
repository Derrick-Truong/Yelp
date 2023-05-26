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

const deleteRestaurant = (restaurantId) => {
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

     await  dispatch(homeRestaurants(list))
    }
};

export const restaurantDetails = (restaurantId) => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurantId}`)

    if (response.ok) {
        const res = await response.json()
       await dispatch(getRestaurantDetails(res))
    }
}
export const updateOneRestaurant = (restaurant, restaurantPictures,  restaurantId) => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant)
    })
    if (res.ok) {
        const newRestaurant = await res.json()
        newRestaurant['RestaurantImages'] = []
        for (let i = 0; i < restaurantPictures.length; i++) {
            const response2 = await csrfFetch(`/api/restaurants/${restaurantId}/pictures`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurantPictures[i])
            })

            const newPicture = await response2.json()
            if (response2.ok) {
                newRestaurant.RestaurantImages.push(newPicture)
            }
        }
        await dispatch(updateRestaurant(newRestaurant))
        return newRestaurant
    }


};


export const createRestaurant = (restaurant, restaurantPictures) => async dispatch => {
    const response = await csrfFetch('/api/restaurants', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurant)
    })

    if (response.ok) {
        const newRestaurant = await response.json()
        newRestaurant['RestaurantImages'] = []
    for (let i=0; i < restaurantPictures.length; i++) {
        const response2 = await csrfFetch(`/api/restaurants/${newRestaurant.id}/pictures`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurantPictures[i])
        })

        const newPicture = await response2.json()
        if (response2.ok) {
            newRestaurant.RestaurantImages.push(newPicture)
        }
    }
   await dispatch(createOneRestaurant(newRestaurant))
    return newRestaurant
    }

}

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
            return newState;
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
