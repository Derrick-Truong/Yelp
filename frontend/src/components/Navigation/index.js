// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Yelp from "../../assets/Yelp.jpg"
import CreateRestaurant from '../Restaurant/CreateRestaurant';




function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state?.session?.user);
    return (
        <div className='navigation-bar'>
            <div className='nav-innerdiv'>
                <a href="/"><img src={Yelp} height='70px' width='80px' alt='Ice Cream' /></a>
            <div className="left-nav-bar">

      </div>
                    {isLoaded && (
                            <div className='right-nav-div'>
                                <span>
                            {sessionUser ? <span className='nav-create-shop'><OpenModalButton  buttonText='Create Shop' modalComponent={<CreateRestaurant />} /></span> : <></>}
                                </span>
                                <span className='profile-button'>
                                    <ProfileButton user={sessionUser} />
                                </span>
                            </div>
                    )}
            </div>
        </div>
    );

}




export default Navigation;
