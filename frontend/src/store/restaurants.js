import { csrfFetch } from "./csrf";


const ALL_RESTAURANTS = 'restaurants/allRestaurants';


const homeRestaurants = (restaurants) => {
return {
    type: ALL_RESTAURANTS,
    restaurants
}
}



export const getRestaurants = () => async dispatch => {
    const response = await fetch('/api/restaurants')

    if (response.ok) {
        const list = await response.json();

        dispatch(homeRestaurants(list))
    }
};


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
        default: return prevState
    }
}

export default restaurantReducer
