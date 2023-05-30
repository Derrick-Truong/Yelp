
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
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import UpdateRestaurant from '../UpdateRestaurant';
import Yelp from "../../../assets/Yelp.jpg"
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import "swiper/css";
import './RestaurantItem.css'

SwiperCore.use([EffectCoverflow, Pagination]);




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
    const restaurantImages= restaurant?.RestaurantImages
    const avgRating = restaurant?.avgRating
    const starRating = Number(avgRating).toFixed(1)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        dispatch(restaurantDetails(restaurantId))
        dispatch(getReviews(restaurantId))
    }, [dispatch, JSON.stringify(restaurantId), JSON.stringify(restaurant), JSON.stringify(reviews)])
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

    if (!restaurant) {
        return null
    }

    return (
        <>
            <div className='restaurant-item-images-container'>
                <div className='restaurant-items-photo-text'>

                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='restaurant-item-images-container-slider'>

                    <div className='restaurant-item-images-container-slider-track'>
                        {restaurant?.RestaurantImages?.map(image => {
                         return (

                          image && <img key={image.key} className="restaurant-item-restaurant-photos" src={image?.url} alt='image' />
                                )})}

                        <div className='restaurant-item-info-container'>
                            <div>
                            <h1>{restaurant?.title}</h1>
                                {currentUser && (currentUser?.id === restaurant?.userId) ?
                                <span>
                                    <span><OpenModalButton buttonText='Update' modalComponent={<UpdateRestaurant restaurant={restaurant}/>}/></span>
                                <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteRestaurant restaurantId={restaurant?.id} />}/></span></span>
                                :<></>}


                            </div>
                            <h3></h3>
                            <div className='restaurant-avgRating'>
                                <h2>
                                    <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : (2 > avgRating && avgRating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" ></i>
                                    <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                    <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                    <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                    <i style={(avgRating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                    <span className='restaurant-star-rating'><span>  {starRating}</span>
                                        <span>{reviews?.length === 1 ? <span><span> ({reviews.length} </span><span>Review)</span></span> : reviews?.length > 1 ? <span><span> ({reviews.length} </span><span>Reviews)</span></span> : <></>}</span>
                                        <div className='rest-address'>{restaurant?.address}</div>
                                        <div className='rest-city'>{restaurant?.city}, {restaurant?.state}</div>
                                    </span>

                                </h2>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className='restaurant-item-content'>

                {/* <div className="restaurant-title-header">
                <h4 className="restaurant-item-restaurantTitle">{restaurant?.title}</h4>
                <OpenModalButton buttonText='Update' modalComponent={<UpdateRestaurant restaurant={restaurant}/>}/>
            </div> */}
                {/* <div className='restaurant-item-images-container'>

                {restaurant?.RestaurantImages?.map(image => {
                    return (

                        image && <img key={image?.id} className="restaurant-photos" src={image?.url} alt="restaurant-pic" />
                    )

                })}

            </div> */}
                {/* <p className="restaurant-content">
                    {restaurant?.description}
                </p> */}
                {/* <div className="restaurant-footer">
                    {currentUser?.id === restaurant?.userId ? <span><OpenModalButton modalComponent={<DeleteRestaurant restaurantId={restaurant?.id} />} buttonText={<><i className="fa-solid fa-trash"></i></>} /></span> : <></>}
                    <span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>
                </div> */}
                <div className='restaurant-item-reviews-feed'>
                    <div className='write-a-review'>{currentUser && currentUser?.id !== restaurant?.userId ? <OpenModalButton buttonText="Write A Review" modalComponent={<CreateReview restaurantId={restaurant?.id} />} /> : <></>}</div>


                    <div className='container-swipe-feed'>
                        <Swiper

                            grabCursor={true}
                            slidesPerView={5}
                            pagination={true}
                            spaceBetween={0}
                            className="mySwiper"
                        >
                            <div className='swiping-corner-feed'>
                                <>
                                    <mySwiper>

                                        {reviews.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((review) => {
                                            const rating = review?.rating
                                            return (
                                                <>


                                                    {/* <div className='restaurant-item-reviews-card-container'> */}
                                                    <SwiperSlide className='pictures-slide-feed' key={review?.id} >
                                                        <div key={review?.id} className='item-feed'>
                                                            <div className=' reviews-card'>
                                                                <div className='reviews-card-content'>
                                                                    <div className='reviews-card-image'>
                                                                    <img src={review?.previewImage} alt='preview-unavailable' />
                                                                    </div>
                                                                    <div className='reviews-rating'>

                                                                        <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : (2 > rating && rating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" ></i>
                                                                        <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                        <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                        <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                        <i style={(rating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                        <span>{review?.User?.username}</span>
                                                                    </div>

                                                                    <p className='reviews-description'>{review?.description}</p>
                                                                    {currentUser?.id === review?.userId ?
                                                                        <div className='reviews-update-delete-buttons'>

                                                                            <OpenModalButton buttonText='Delete' modalComponent={<DeleteReview reviewId={review?.id} />} />
                                                                            <OpenModalButton buttonText='Update' modalComponent={<UpdateReview review={review} />} />


                                                                        </div> : <></>}
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </SwiperSlide>

                                                </>

                                            )

                                        }

                                        )

                                        }
                                    </mySwiper>
                                </>
                            </div>
                        </Swiper>
                    </div>

                </div>
            </div>


        </>

    )

}



export default RestaurantItem

