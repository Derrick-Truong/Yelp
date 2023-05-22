
import { useState, useEffect } from 'react';
import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../../../OpenModalButton';
import { getReviews } from '../../../store/review';
import DeleteRestaurant from '../DeleteRestaurant';
import { useParams } from 'react-router-dom';
import { restaurantDetails } from '../../../store/restaurants';
import DeleteReview from '../../Reviews/DeleteReview';
import UpdateReview from '../../Reviews/UpdateReview';
import CreateReview from '../../Reviews/CreateReview';
import UpdateRestaurant from '../UpdateRestaurant';
import './RestaurantItem.css'






const RestaurantItem = () => {
    const { restaurantId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const reviewsSelect = useSelector(state => state?.reviews)
    const reviews = Object?.values(reviewsSelect)
    const selectRestaurant = useSelector(state => state?.restaurants)
    const restaurant = selectRestaurant[restaurantId]
    const currentUser = useSelector(state => state?.session?.user)


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        dispatch(restaurantDetails(restaurantId))
        dispatch(getReviews(restaurantId))
    }, [dispatch, JSON.stringify(restaurant), JSON.stringify(reviews)])
    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = (e) => {
    //         if (!ulRef?.current?.contains(e?.target)) {
    //             setShowMenu(false);
    //         }
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);


    // const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (

        <div className='restaurant-item-content'>
            <div className="restaurant-title-header">
                <h4 className="restaurant-item-restaurantTitle">{restaurant?.title}</h4>
                <OpenModalButton buttonText='Update' modalComponent={<UpdateRestaurant restaurant={restaurant}/>}/>
            </div>
            <div className='restaurant-item-images-container'>
                <div>
                {restaurant?.RestaurantImages?.map(image => {
                    return (

                        image && <img key={image?.id} className="restaurant-photos" src={image?.url} alt="restaurant-pic" />
                    )

                })}
                </div>
            </div>
            <p className="restaurant-content">
                {restaurant?.description}
            </p>
            <div className="restaurant-footer">
                {currentUser?.id === restaurant?.userId ? <span><OpenModalButton modalComponent={<DeleteRestaurant restaurantId={restaurant?.id} />} buttonText={<><i className="fa-solid fa-trash"></i></>} /></span> : <></>}
                <span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>
            </div>
            <div className="dropdown m-10">
                <OpenModalButton buttonText="Write a review" modalComponent={<CreateReview restaurantId={restaurant?.id}/>}/>
                {reviews.length ?

                    reviews.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((review) => {
                        const reviewDate = new Date(review.createdAt);
                        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(reviewDate);
                        return (
                            <li key={review.id}>
                                <span className="comment-owner">{review?.User?.username}</span>
                                <div className="the-comments-commented">
                                    <span>{review?.description}</span>
                                    {currentUser?.id === review?.User?.id ?
                                    <span>
                                    <span>
                                    <OpenModalButton buttonText='Update' modalComponent={<UpdateReview review={review}/>}/>
                                    </span>
                                    <span>
                                    <OpenModalButton buttonText='Delete' modalComponent={<DeleteReview reviewId={review?.id}/>}/>
                                    </span>
                                        </span>
                                    :<></>}
                                </div>
                            </li>
                        )
                    }) : null
                }

            </div>
        </div>

    )
}

export default RestaurantItem
