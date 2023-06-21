import React, { useRef } from "react";
import { useMemo } from "react";
import Directions from "./Directions";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PacmanLoader from "react-spinners/PacmanLoader";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
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
import SwiperCore, { EffectCoverflow, Navigation } from 'swiper';
import { Grid, Pagination } from "swiper";
import UpdateRestaurant from '../UpdateRestaurant';
import Yelp from "../../../assets/Yelp.jpg"
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import './TestRestaurant.css'



const TestRestaurant = () => {
    SwiperCore.use([EffectCoverflow, Pagination]);

    // const [selected, setSelected] = useState(null)
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    //     libraries: ["places"]
    // })
    const [loading, setLoading] = useState(false)
    const { restaurantId } = useParams()
    const restaurantVal = useSelector(state => state.restaurants)
    const restaurant = restaurantVal[restaurantId];
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const reviewsSelect = useSelector(state => state.reviews)
    const reviews = Object?.values(reviewsSelect)
    // const restaurant = selectRestaurant[restaurantId]
    const currentUser = useSelector(state => state?.session?.user)
    const avgRating = restaurant?.avgRating
    const addressVal = restaurant?.address
    const cityVal = restaurant?.city
    const stateVal = restaurant?.state
    const restaurantImages = restaurant?.RestauntImages
    var starRating = Number(avgRating)?.toFixed(1)
    // var geocoder = new window.google.maps.Geocoder();
    var address = `${addressVal} ${cityVal} ${stateVal}`;
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    var map;
    var marker;
    useEffect(() => {
        dispatch(restaurantDetails(restaurantId));
        dispatch(getReviews(restaurantId));
    }, [dispatch, JSON.stringify(restaurant), JSON.stringify(restaurantImages), JSON.stringify(reviews)]);

    async function geocodeAddress(geocoder, address) {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK") {
                    resolve({ results, status });
                } else {
                    reject(new Error("Geocode was not successful for the following reason: " + status));
                }
            });
        });
    }
    async function initMap() {
        try {
            const { Map } = await window.google.maps.importLibrary("maps");
            var geocoder = new window.google.maps.Geocoder();
            const { results, status } = await geocodeAddress(geocoder, address);

            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                const position = { lat: location.lat(), lng: location.lng() };
                // The map, centered at the restaurant location
                const mapElement = document.getElementById("map");
                map = new Map(mapElement, {
                    zoom: 12,
                    center: position,

                });

                // The marker, positioned at the restaurant location
                marker = new window.google.maps.Marker({
                    map: map,
                    position: position,
                    optimized: false

                });
            }

        } catch (error) {
            console.log("An error occurred during geocoding:", error);
        }
    }
    initMap()
    // function routeSuccess(position) {
    //     var directionsService = new window.google.maps.DirectionsService();
    //     var directionsDisplay = new window.google.maps.DirectionsRenderer();
    //     var trafficLayer = new window.google.maps.TrafficLayer()
    //     var myLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    //     const iceCreamShop = `${addressVal} ${cityVal} ${stateVal}`;
    //     const mapElement = document.getElementById("map2");
    //     const routeOptions = {
    //         zoom: 12,
    //         center: { lat: 37.8272, lng: 122.2913 },

    //     }
    //     const map = new window.google.maps.Map(mapElement, routeOptions);
    //     directionsDisplay.setMap(map);
    //     trafficLayer.setMap(map)

    //     map.setCenter(myLocation);

    //     var routeRequest = {
    //         origin: myLocation,
    //         destination: iceCreamShop,
    //         travelMode: 'DRIVING'
    //     }
    //     directionsService.route(routeRequest, function (result, status) {
    //         if (status == window.google.maps.DirectionsStatus.OK)
    //             directionsDisplay.setDirections(result)
    //     })

    // }
    // function routeError() {
    //     alert("Couldn't get location");
    // }

    // async function allArguments() {
    //     await initMap();

    // }
    // if (!restaurant) {
    //     return <div className='loading-icon'>
    //         <div class="page-wrapper" size={200}>
    //             <div class="loader">
    //                 <div class="jelly">
    //                     <div class="body"></div>
    //                     <div class="stick"></div>
    //                     <div class="eye"></div>
    //                     <div class="eye"></div>
    //                     <div class="mouth"></div>
    //                 </div>
    //                 <div class="shadow"></div>
    //             </div>
    //         </div>
    //     </div>;
    // }



    return (
        <>
            {/* {loading ? */}
                {/* <div className='loading-icon'>
                    <div class="page-wrapper" size={200} >
                        <div class="loader">
                            <div class="jelly">
                                <div class="body"></div>
                                <div class="stick"></div>
                                <div class="eye"></div>
                                <div class="eye"></div>
                                <div class="mouth"></div>
                            </div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                </div>
                : */}
                <section>
                    <div className='restaurant-item-images-container'>

                        <div className='restaurant-item-images-container-slider'>

                            <div className='restaurant-item-images-container-slider-track'>
                                {restaurant?.RestaurantImages?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(image => {
                                    const url = 'https://icecreamfinder.s3.us-west-1.amazonaws.com/' + image?.url

                                    return (
                                        image && <img key={image.id} className="restaurant-item-restaurant-photos" src={url} alt='image' />
                                    )
                                })}
                                <div className='restaurant-item-info-container'>
                                    <div className='restaurant-info-inner-container'>
                                        <h1>{restaurant?.title}</h1>
                                        {currentUser && (currentUser?.id === restaurant?.userId) ?
                                            <span>
                                                <span><OpenModalButton buttonText='Update' modalComponent={<UpdateRestaurant restaurant={restaurant} />} /></span>
                                                <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteRestaurant restaurantId={restaurant?.id} />} /></span></span>
                                            : <></>}
                                        <h3></h3>
                                        <div className='restaurant-avgRating'>
                                            <h2>
                                                <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : (2 > avgRating && avgRating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" ></i>
                                                <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                <i style={(avgRating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                                <span className='restaurant-star-rating'><span> {starRating > 0 ? starRating:'No reviews yet'}</span>
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
                    </div>

                    <div id="map-container">
                    {/* {currentUser.id === restaurant.userId ? <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteRestaurant restaurantId={restaurant?.id} />} /></span> : <></>} */}
                        <div style={{ width: '50%', height: '50%' }}>
                            <section className='directions-reset-container'>
                            <div className='location-title'>Location</div>
                            </section>
                            <div id="map">

                            </div>
                                <Directions restaurantId={restaurantId} />
                        </div>
                    </div>
                </section>
            {/* } */}
        </>

    )


}



export default TestRestaurant
