import { useDispatch, useSelector } from "react-redux";
import { updatedRestaurant } from "../../../store/restaurants";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './CreateRestaurant.css'

const UpdateRestaurant = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image2Url, setImage2Url] = useState("");

    const handleSubmit = (e) => {
        const newListing = {
            country: country,
            description: description,
            price: price,
            title: title,
            address: address,
            city: city,
            state: state
        }
        let restaurantImage = [];
        if (previewImage) {
            const firstImage = {
                preview: true,
                url: previewImage
            }
            restaurantImage.push(firstImage)
        }
        if (image2Url) {
            const secondImage = {
                preview: false,
                url: image2Url
            }
            restaurantImage.push(secondImage)
        }



        const createdRestaurant = dispatch(createRestaurant(newListing, restaurantImage))
        if (createdRestaurant) {
            history.push('/')
        }
    }
    return (
        <section className="create-restaurant-page">
            <form className="create-restaurant-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image 2 Url"
                    value={image2Url}
                    onChange={e => setImage2Url(e.target.value)}
                />
                <button type="submit" className="create-button">Update Restaurant</button>
            </form>
        </section>
    )
}

export default UpdateRestaurant



