// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Yelp from "../../assets/Yelp.jpg"
import Test1 from '../Aws/Test1';




function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state?.session?.user);
    return (
        <div className='nav-wrapper'>
        <div className='navigation-bar'>
            <div className='nav-innerdiv'>
                <a href="/"><img src={Yelp} height='60px' width='80px' alt='Ice Cream' /></a>
            <div className="left-nav-bar">

      </div>
                    {isLoaded && (
                            <div className='right-nav-div'>
                            {sessionUser ? <span className='nav-create-shop'><OpenModalButton  buttonText='Create Shop' modalComponent={<Test1 />} /></span> : <></>}
                                <div className='profile-button'>
                                    <ProfileButton user={sessionUser} />
                                </div>
                            </div>
                    )}
            </div>
                <div className='footer'>
                    <p className="links-footer">
                        <a className="linkedin" href="https://www.linkedin.com/in/derrick-truong-1a092121a/" target="_blank">LinkedIn</a>
                        <a className="github" href="https://github.com/Derrick-Truong" target="_blank">Github</a>
                        {/* <a className="portfolio" href="https://kishaonia.github.io/KishaOnia/" target="_blank">Portfolio</a> */}
                        <a className="email" href="mailto:dtruong169@gmail.com" target="_blank">Email</a>
                    </p>
                </div>
        </div>
        </div>
    );

}




export default Navigation;
