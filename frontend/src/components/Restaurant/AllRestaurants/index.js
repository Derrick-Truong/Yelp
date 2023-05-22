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
import { NavLink } from 'react-router-dom'


const AllRestaurants = () => {
    const history = useHistory()
    const restaurants = useSelector(state => state?.restaurants)
    const restaurantsValues = Object?.values(restaurants)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRestaurants())
    }, [dispatch, JSON.stringify(restaurantsValues)])


    return (
        <>
            <div className='All-Restaurants-Feed'>
                {restaurantsValues?.sort((a, b) => b.avgRating - a.avgRating)?.map(restaurant => {
                    return(
                <nav key={restaurant?.id}>
                    <NavLink exact to={`/restaurants/${restaurant?.id}`}>
                    <div className='home-page-restaurant-container'>
                        <span className='home-page-restaurant-card'>
                            <img className='all-restaurants-preview-image' src={restaurant?.previewImage} alt='preview-image' />
                            <div className='home-page-restaurant-card-content'>
                                <h3>{restaurant?.title}</h3>
                                <p>{restaurant?.description}</p>
                            </div>
                        </span>
                    </div>
                    </NavLink>
                    </nav>
                    )
                }
                )}
            </div>
        </>
    )
}

export default AllRestaurants
