import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getRestaurants } from '../../../store/restaurants'
import { getReviews } from '../../../store/review'
import RestaurantItem from '../RestaurantItem'
import './AllRestaurants.css'


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
       {restaurantsValues?.map(restaurant =>
        <li key={restaurant?.id} className="restaurant">
            <RestaurantItem restaurant={restaurant}/>
        </li>
       )}
     </div>
        </>
    )
}

export default AllRestaurants
