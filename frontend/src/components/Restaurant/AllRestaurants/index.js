import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getRestaurants } from '../../../store/restaurants'
import { getReviews } from '../../../store/review'
import RestaurantItem from '../RestaurantItem'
import CreateRestaurant from '../CreateRestaurant'
import OpenModalButton from '../../../OpenModalButton'
import './AllRestaurants.css'
import CreateReview from '../../Reviews/CreateReview'


const AllRestaurants = () => {
const restaurants = useSelector(state => state?.restaurants)
const restaurantsValues = Object?.values(restaurants)

const dispatch = useDispatch()

useEffect(() => {
dispatch(getRestaurants())
}, [dispatch, JSON.stringify(restaurantsValues)])


    return (
        <>
    <div className = 'All-Restaurants-Feed'>
        <OpenModalButton buttonText='review' modalComponent={<CreateReview/>}/>
        <div className='home-page-restaurant-list'>
       {restaurantsValues?.sort((a, b) => b.avgRating - a.rating)?.map(restaurant =>
       <div>
       <img className ='all-restaurants-preview-image' src={restaurant?.previewImage} alt='preview-image'/>
        <h3>{restaurant?.title}</h3>
        <p>{restaurant?.description}</p>
        </div>
       )}
        </div>
     </div>
        </>
    )
}

export default AllRestaurants
