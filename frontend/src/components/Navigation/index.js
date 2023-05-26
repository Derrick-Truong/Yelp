// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Yelp from "../../assets/Yelp.jpg"




function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state?.session?.user);
    return (
        <div className='navigation-bar'>
            <div className='nav-innerdiv'>
                <a href="/"><img src={Yelp} height='70px' width='80px' alt='Ice Cream' /></a>
            <div className="left-nav-bar">
                    <button className='nav-create-shop-button'><NavLink exact to='/create'>Create a Shop</NavLink></button>
      </div>
                    {isLoaded && (
                            <div className='right-nav-div'>
                                <div className='profile-button'>
                                    <ProfileButton user={sessionUser} />
                                </div>
                            </div>
                    )}
            </div>
        </div>
    );

}




export default Navigation;
