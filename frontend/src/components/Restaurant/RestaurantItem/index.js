
import { useState, useEffect } from 'react';
import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../../../OpenModalButton';
import { getReviews } from '../../../store/review';
import { useParams } from 'react-router-dom';
import DeleteRestaurant from '../DeleteRestaurant';
import './RestaurantItem.css'






const RestaurantItem = ({restaurant}) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.session?.user)


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef?.current?.contains(e?.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (

            <div className='restaurant-item-content'>
            <div className="restaurant-title-header">
                <h4 className="restaurant-item-restaurantTitle">{restaurant?.title}</h4>
            </div>
            <img className='restaurant-preview-image' src={restaurant?.previewImage} alt='preview-image'/>
            <p className="restaurant-content">
                {restaurant?.description}
            </p>
            <div className="restaurant-footer">
                {currentUser?.id === restaurant?.userId ? <span><OpenModalButton modalComponent={<DeleteRestaurant restaurantId={restaurant?.id}/>}  buttonText={<><i className="fa-solid fa-trash"></i></>}/></span>:<></>}
                <span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>
            </div>
            <div className="dropdown m-10">
                <ul className={ulClassNameUpdateDelete} ref={ulRef}>
                    {restaurant?.Reviews?.length ?

                        restaurant?.Reviews?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((review) => {

                            return (
                                <li key={review.id}>
                                    <div className="list-for-update-delete">
                                        <div className="trash-comment">
                                            <div className="comment-text-bubble">
                                                <span className="comment-owner">{review.User.username}</span>
                                                <div className="the-comments-commented">
                                                    <span>{review?.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
            </div>

    )
}

export default RestaurantItem
