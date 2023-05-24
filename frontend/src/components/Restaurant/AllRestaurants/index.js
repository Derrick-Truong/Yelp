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
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner from '../../../assets/banner-derrick.jpg'

SwiperCore.use([EffectCoverflow, Pagination]);





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
          <div className='banner-welcome'><img className="banner-welcome-2" src={banner} /></div>
            <div className='All-Restaurants-Feed'>


                <div className='container-swipe'>
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        spaceBetween={5}
                        className="mySwiper"
                    >
                        <div className='swiping-corner'>
                            {restaurantsValues?.sort((a, b) => b.avgRating - a.avgRating)?.map(restaurant => {
                                const rating = restaurant?.avgRating;
                                return (
                                    <SwiperSlide className='pictures-slide' key={restaurant?.id} >
                                        <NavLink exact to={`/restaurants/${restaurant?.id}`}>
                                            <div className='home-page-restaurant-container'>
                                                <span className='home-page-restaurant-card'>
                                                    <img className="all-restaurants-preview-image" src={restaurant?.previewImage} alt="preview-image" />

                                                    <div className='home-page-restaurant-card-content'>
                                                        <h4>
                                                            <span className='home-page-restaurant-title'>{restaurant?.title}</span>
                                                            <span>  <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : (2 > rating && rating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" ></i>
                                                                <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                                <i style={(rating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i></span>




                                                        <p>{restaurant?.description}</p>
                                                        </h4>
                                                    </div>
                                                </span>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>

                                );
                            })}</div>
                    </Swiper>
                </div>

                <div className='filler-information'>
                          <div className='our-dairy-filler'>
                            <h4 className='title-filler'>Our Mission</h4>
                          Welcome to Ice Cream Delight, a heavenly oasis for ice cream enthusiasts, created by the visionary artisan Derrick Truong. Step into a world where every scoop is a delightful journey of flavors and textures, crafted with the utmost care and devotionAt Ice Cream Delight, we believe that exceptional ice cream begins with the finest dairy ingredients. TFrom classics like creamy vanilla and decadent chocolate to tantalizing twists like caramel swirl and fresh fruit sorbets, every scoop at Ice Cream Delight is a moment of pure bliss. Each batch is meticulously handcrafted by Derrick himself, ensuring that every spoonful delivers a burst of pure delight.
We invite you to embark on a magical ice cream adventure at Ice Cream Delight. Discover the harmonious fusion of exceptional dairy, passion-infused craftsmanship, and an unrelenting pursuit of frozen perfection. Your taste buds will thank you as you experience the captivating allure of our extraordinary ice cream flavors. Welcome to a world where dreams are transformed into frozen realities—welcome to Ice Cream Delight by Derrick Truong.
                          </div>
                          <div className='ingredients-filler'><h4 className='title-filler'>Our Users</h4>
                          At Ice Cream Delight by Derrick Truong, we take pride in complementing our high-quality dairy with the very best ingredients. From scratch, we cook and bake an array of delectable treats in-house, ensuring that every guest is served the freshest and most exceptional ingredients. Our commitment to quality shines through in every scoop, creating an unforgettable ice cream experience.
                          </div>
                          <div className='our-passion-filler'><h4 className='title-filler'>Our Passion</h4>Rooted in a shared love for ice cream and the cherished memories it invokes, Through meticulous ingredient selection, refined processes, and a passionate team, their aim was not just to craft delightful flavors but to foster togetherness. Whether it's a family outing, a moment of solace, a reunion, or simply indulging your sweet cravings, we believe that any occasion is perfect for savoring our creations and hope you find the same joy in our flavors as we do in creating them.</div>
                </div>
            </div>
        </>
    );

}

export default AllRestaurants
