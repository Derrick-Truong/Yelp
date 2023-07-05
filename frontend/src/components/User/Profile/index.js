import { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUsersRestaurants } from '../../../store/restaurants'
import { NavLink } from 'react-router-dom'

const Profile = () => {
const dispatch = useDispatch()
useEffect(() => {
    dispatch(getUsersRestaurants())
},[dispatch])
    return(
        <>
        </>
    )
}

export default Profile
