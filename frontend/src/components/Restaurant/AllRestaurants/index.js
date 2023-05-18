import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getRestaurants } from '../../../store/restaurants'
import './AllRestaurants.css'


const AllRestaurants = () => {
const restaurants = useSelector(state => state?.restaurants)
console.log('Restaurants', restaurants)
const dispatch = useDispatch()

useEffect(() => {
dispatch(getRestaurants())
}, [dispatch])


    return (
        <>
        <h1>Hello</h1>
        </>
    )
}

export default AllRestaurants
