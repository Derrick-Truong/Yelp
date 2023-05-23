import { csrfFetch } from "./csrf"
const GET_REVIEWS_FOR_RESTAURANT = 'reviews/getReviewsForRestaurant'
const UPDATE_REVIEW = 'reviews/updateReview'
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const getReviewsForRestaurant = (reviews) => {
    return {
        type: GET_REVIEWS_FOR_RESTAURANT,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}


const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getReviews = (restaurantId) => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`)

    if (response.ok) {
        const list = await response.json()
        dispatch(getReviewsForRestaurant(list))
    }
}

export const updateOneReview = (review, reviewImage, reviewId ) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const response2 = await response.json()
        const successImage = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewImage)
        })
        response2['ReviewImages'] = []
        if (successImage) {
            const previewImage = await successImage.json()
            response2.ReviewImages.push(previewImage)
        }

        dispatch(updateReview(response2))

        return response2
    }
}
export const createOneReview = (review, reviewImage, restaurantId) => async dispatch => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const response2 = await response.json()
        const successImage = await csrfFetch(`/api/reviews/${response2.id}/pictures`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewImage)
        })
        response2['ReviewImages'] = []
        if (successImage.ok) {
            let newImage = await successImage.json()
            response2.ReviewImages.push(newImage)
        }

       await dispatch(createReview(response2))
       return response2

    }

}

export const deleteOneReview = (reviewId) => async dispatch => {
const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method:'DELETE'
})

if (response.ok) {
    dispatch(deleteReview(reviewId))
}

}





const reviewReducer = (prevState = {}, action) => {
let newState;
    switch(action.type){
        case GET_REVIEWS_FOR_RESTAURANT:
        newState={}
        action?.reviews?.Reviews?.forEach(review => {
            newState[review.id] = review
        })
        return newState
        case CREATE_REVIEW:
        newState={...prevState}
        newState[action.review.id] = action.review
        return newState
        case UPDATE_REVIEW:
        newState = { ...prevState }
        newState[action.review.id] = action.review
         return newState
        case DELETE_REVIEW:
        newState = {...prevState}
        delete newState[action.reviewId]
        return newState
        default: return prevState
    }

}

export default reviewReducer
