import { useSelector } from 'react-redux';
import OpenModalButton from '../../../OpenModalButton';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateReview from '../../Reviews/CreateReview';
import { getReviews } from '../../../store/review';
import './Directions.css'
import UpdateReview from '../../Reviews/UpdateReview';
import DeleteReview from '../../Reviews/DeleteReview';
const Directions = ({ restaurantId }) => {
    const dispatch = useDispatch()
    const restaurants = useSelector((state) => state?.restaurants);
    const reviewsSelect = useSelector(state => state.reviews)
    const reviews = Object?.values(reviewsSelect)
    const restaurant = restaurants[restaurantId];
    const addressVal = restaurant?.address;
    const cityVal = restaurant?.city;
    const stateVal = restaurant?.state;
    const iceCreamShop = `${addressVal} ${cityVal} ${stateVal}`;
    const currentUser = useSelector(state => state.session.user)
    const [showDirections, setShowDirections] = useState(false);

    let map;
    const handleDirectionsClick = () => {
        setShowDirections(true);
        navigator.geolocation.getCurrentPosition(routeSuccess, routeError);
    };

    function addZero(num) {
        return num < 10 ? `0${num}` : num
    }
    const today = new Date();
    const currentDay = today.getDay(); // Get the local day of the week
    const current_date = `${today?.getMonth() + 1}/${today?.getDate()}/${today?.getFullYear()}`;
    const current_time = `${addZero(today?.getHours())}:${addZero(today?.getMinutes())}:${addZero(today?.getSeconds())}`;
    const startDate = new Date('June 16, 2023 8:30:00')
    const endDate = new Date('June 19, 2023 20:30:00')
    const startDateString = startDate?.toTimeString().slice(0, 8)
    const endDateString = endDate?.toTimeString().slice(0, 8)
    const month = today.getMonth()+ 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hours = addZero(today.getHours());
    const minutes = addZero(today.getMinutes());
    const seconds = addZero(today.getSeconds());
    const handleReset = async() => {
        setShowDirections(false); // Set show directions to false
        // Clear the map container

        try {
            const { Map } = await window.google.maps.importLibrary("maps");
            var geocoder = new window.google.maps.Geocoder();
            // You may need to reinitialize the map with the desired options
            var address = `${addressVal} ${cityVal} ${stateVal}`;
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
                const marker = new window.google.maps.Marker({
                    map: map,
                    position: position,
                    title: "Restaurant",
                });
            }

        } catch (error) {
            console.log("An error occurred during geocoding:", error);
        }
        // Any other map initialization code can be added here
    };
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

    function routeSuccess(position) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();
        const trafficLayer = new window.google.maps.TrafficLayer();
        const myLocation = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        );

        const mapElement = document.getElementById("map");
        const routeOptions = {
            zoom: 12,
            center: { lat: 37.8272, lng: 122.2913 },
        };
        const map = new window.google.maps.Map(mapElement, routeOptions);
        directionsDisplay.setMap(map);
        trafficLayer.setMap(map);
        map.setCenter(myLocation);

        const routeRequest = {
            origin: myLocation,
            destination: iceCreamShop,
            travelMode: 'DRIVING',
        };
        directionsService.route(routeRequest, function (result, status) {
            if (status === window.google.maps.DirectionsStatus.OK)
                directionsDisplay.setDirections(result);
        });
    }

    function routeError() {
        alert("Couldn't get location");
    }
    // useEffect(() => {
    //     // dispatch(getReviews(restaurantId));
    // }, [JSON.stringify(current_time), JSON.stringify(today), JSON.stringify(currentDay), JSON.stringify(startDate), JSON.stringify(endDate)])
    return (
        <>
            <div>
            </div>
            <section className="directions-buttons-container">
                <button className="directions-button" onClick={handleDirectionsClick}>Directions</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </section>
            <section className="restaurant-hours-border">
                <div className="restaurant-hours-title">Hours</div>
                <ul className="restaurant-hours">
                    <span>
                        <li className="weekday">Monday</li>
                        <li className="weekday">Tuesday</li>
                        <li className="weekday">Wednesday</li>
                        <li className="weekday">Thurday</li>
                        <li className="weekday">Friday</li>
                        <li className="weekday">Saturday</li>
                        <li className="weekday">Sunday</li>
                    </span>
                    <span>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                        <li className="weektime">8:30 AM - 8:30 PM</li>
                    </span>
                    <span>
                        {currentDay === 1 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 1 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">1</li>}
                        {currentDay === 2 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 2 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">2</li>}
                        {currentDay === 3 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 3 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">3</li>}
                        {currentDay === 4 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 4 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">4</li>}
                        {currentDay === 5 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 5 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">5</li>}
                        {currentDay === 6 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 6 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">6</li>}
                        {currentDay === 0 && startDateString < current_time && current_time < endDateString ? (
                            <li className="open">Open</li>
                        ) : currentDay === 0 && (startDateString > current_time || current_time > endDateString) ? (
                            <li id="restaurant-closed">Closed</li>
                            ) : <li className="none">0</li>}
                    </span>
                </ul>
            </section>
            <section className="restaurant-reviews-border">
                {reviews.length > 0 ? <div className="restaurant-reviews-title">Reviews</div> : <div className="restaurant-reviews-title">No reviews yet</div>}
                <div className="restaurant-create-review">
                    {currentUser && currentUser?.id !== restaurant?.userId ? <OpenModalButton buttonText="Write A Review" modalComponent={<CreateReview restaurantId={restaurant?.id} />} /> : <></>}
                </div>
                {reviews?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((review) => {
                    const avgRating = review?.rating
                    return (
                        <>
                            <div className="reviews-card-container">
                                {currentUser && (currentUser.id === review?.userId) ? <span><div className="delete-review-button-container"><OpenModalButton buttonText="Delete" modalComponent={<DeleteReview reviewId={review?.id} />} /></div><div className="update-review-button-container"><OpenModalButton buttonText="Update" modalComponent={<UpdateReview review={review} />} /></div></span>:<></>}
                                <div className="reviews-box">
                                    <div className="reviews-card-top">
                                        <div className="user">
                                            <div className="user-img">
                                                {/* <img/> */}
                                            </div>
                                            <div className="user-name">
                                                <div className="user-name-inner">
                                                    {review?.User?.firstName}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reviews-rating">
                                            <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : (2 > avgRating && avgRating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" ></i>
                                            <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : (3 > avgRating && avgRating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                            <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : (4 > avgRating && avgRating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                            <i style={(avgRating >= 5) ? { color: '#43a700' } : (5 > avgRating && avgRating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                            <i style={(avgRating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream"></i>
                                        </div>

                                    </div>
                                    <div className="review-description">
                                        <p>{review?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                )
                }
            </section>
        </>
    );
};



export default Directions;
