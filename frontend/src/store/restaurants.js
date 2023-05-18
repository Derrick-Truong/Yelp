import { csrfFetch } from "./csrf";


const ALL_RESTAURANTS = 'restaurants/ALL_RESTAURANTS';


export const allRestaurants = restaurants => ({
    type: ALL_RESTAURANTS,
    restaurants

});



export const getRestaurants = () => async dispatch => {
    const response = await fetch('/api/restaurants')

    if (response.ok) {
        const list = await response.json();

        dispatch(allRestaurants(list))
    }
};


const initialState = {

}

const restaurantReducer = (prevState = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_RESTAURANTS:
            newState = {}
            action.restaurants.forEach(restaurant => {
                newState[restaurant.id] = restaurant
            })
            return newState;
        default: return prevState
    }
}

export default restaurantReducer
