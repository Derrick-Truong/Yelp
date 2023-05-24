import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { updateOneRestaurant } from "../../../store/restaurants";
import { useModal } from "../../../Context/Modal";
import './UpdateRestaurant.css'


const UpdateRestaurant = ({restaurant}) => {
    const {closeModal} = useModal()
    const restaurantId = restaurant?.id
    const history = useHistory();
    const dispatch = useDispatch();
    const [city, setCity] = useState(restaurant?.city);
    const [state, setState] = useState(restaurant?.state);
    const [country, setCountry] = useState(restaurant?.country);
    const [title, setTitle] = useState(restaurant?.title);
    const [address, setAddress] = useState(restaurant?.address);
    const [errors, setErrors] = useState({})
    const [previewImage, setPreviewImage] = useState(restaurant?.RestaurantImages[0].url);
    const [description, setDescription] = useState(restaurant?.description);
    const [price, setPrice] = useState(restaurant?.price);
    const [image2Url, setImage2Url] = useState(restaurant?.image2Url);






    const valid = () => {
        let newErrors = {}
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
            ))
        {
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

    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        valid()
        if (errors?.length) {
            return setErrors()
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
    dispatch(updateOneRestaurant(newListing, restaurantImage, restaurantId)).then(closeModal)



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
                <h4>{errors.country && <span className="error">{errors.country}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <h4>{errors.state && <span className="error">{errors.state}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <h4>{errors.address && <span className="error">{errors.address}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <h4>{errors.city && <span className="error">{errors.city}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <h4>{errors.price && <span className="error">{errors.price}</span>}</h4>
                <br></br>
                <input

                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <h4>{errors?.title && <span className="error">{errors.title}</span>}</h4>
                <br></br>
                <textarea
                    rows="10" cols="60"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <h4>{errors?.description && <span className="error">{errors.description}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                />
                <h4>{errors?.previewImage && <span className="error">{errors.previewImage}</span>}</h4>
                <br></br>
                <input
                    type="text"
                    placeholder="Image 2 Url"
                    value={image2Url}
                    onChange={e => setImage2Url(e.target.value)}
                />
                <h4>{errors?.imageUrl2 && <span className="error">{errors.imageUrl2}</span>}</h4>
                <br></br>
                <button type="submit" className="create-button">Update Restaurant</button>
            </form>
        </section>
    )
}

export default UpdateRestaurant



