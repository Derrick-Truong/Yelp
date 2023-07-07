import { useState } from 'react';
import { useSelector } from 'react-redux';

const Routes = ({ restaurantId }) => {
    const restaurants = useSelector((state) => state?.restaurants);
    const restaurant = restaurants[restaurantId];
    const addressVal = restaurant?.address;
    const cityVal = restaurant?.city;
    const stateVal = restaurant?.state;
    var geocoder = new window.google.maps.Geocoder();
    const address = `${addressVal} ${cityVal} ${stateVal}`;
    const [showDirections, setShowDirections] = useState(false);


    const handleDirectionsClick = async () => {
        setShowDirections(true);
        navigator.geolocation.getCurrentPosition(routeSuccess, locationError);
    };


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
            center: position,
        };
        const map = new window.google.maps.Map(mapElement, routeOptions);
        directionsDisplay.setMap(map);
        trafficLayer.setMap(map);
        map.setCenter(myLocation);

        const routeRequest = {
            origin: myLocation,
            destination: address,
            travelMode: 'DRIVING',
        };
        directionsService.route(routeRequest, function (result, status) {
            if (status === window.google.maps.DirectionsStatus.OK)
                directionsDisplay.setDirections(result);
        });
    }


    function locationError() {
        alert("Couldn't get location");
    }
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

    // success()
    return (
        <>
            <div id="map">
            </div>
            <button onClick={handleDirectionsClick}>Directions</button>
        </>
    )

}

export default Routes
