import { useDispatch, useSelector } from "react-redux";
import { createRestaurant } from "../../../store/restaurants";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './CreateRestaurant.css'

const CreateRestaurant = () => {
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
    const [errors, setErrors] = useState([]);
    const [image2Url, setImage2Url] = useState("");


    const valid = () => {
        let newErrors = []
        if (!address) {
            newErrors.address = "Address is required."
        }

        if (!city) {
            newErrors.city = "City is required."
        }

        if (!state) {
            newErrors.state = "State is required."
        }

        if (!country) {
            newErrors.country = "Country is required."
        }
        if (!price) {
            newErrors.price = "Price per night is required."
        }

        if (price && !(parseInt(price))) {
            newErrors.price = "Price is required needs to be a number."
        }
        if (!previewImage) {
            newErrors.previewImage = "Preview image is required"
        }

        if (previewImage) {
            if (!
                (
                    previewImage.endsWith('png') ||
                    previewImage.endsWith('.jpg') ||
                    previewImage.endsWith('.jpg')
                )) {
                newErrors.previewImage = 'Preview must end in .png, .jpg, or .jpeg'
            }

        }
        if (image2Url) {
            if (
                !(
                    image2Url.endsWith(".png") ||
                    image2Url.endsWith(".jpg") ||
                    image2Url.endsWith(".jpeg")
                )
            ) {
                newErrors.image2Url = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        setErrors(newErrors)
        console.log('NewErrors', newErrors)
    }

const handleSubmit = async(e) => {

    e.preventDefault();
    valid()
    if (errors.length > 0) {
       return setErrors([])
    }

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
    if (previewImage){
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
    if (createdRestaurant.ok) {
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
                <h4></h4>
                <br></br>
                {errors?.country && <span className="error">{errors?.country}</span>}

                <h4></h4>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <h4></h4>
                {errors?.state && <span className="error">{errors?.state}</span>}
                <br></br>
                <h4></h4>
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <h4></h4>
                {errors?.address && <span className="error">{errors?.address}</span>}
                <br></br>
                <h4></h4>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <h4></h4>
                {errors?.city && <span className="error">{errors?.city}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <h4></h4>
                {errors?.price && <span className="error">{errors?.price}</span>}
                <br></br>
                <input

                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <h4></h4>
                {errors?.title && <span className="error">{errors?.title}</span>}
                <br></br>
                <textarea
                    rows="10" cols="60"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errors?.description && <span className="error">{errors?.description}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                />
                <h4></h4>
                {errors?.previewImage && <span className="error">{errors?.previewImage}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Image 2 Url"
                    value={image2Url}
                    onChange={e => setImage2Url(e.target.value)}
                />

                {errors?.image2url && <span className="error">{errors?.image2url}</span>}
                <br></br>
            <button type='submit' className="create-button">Create Restaurant</button>
</form>
</section>
    )
}

export default CreateRestaurant
