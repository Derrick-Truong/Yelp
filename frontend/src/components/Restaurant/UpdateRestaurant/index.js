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
    const [im3, setIm3] = useState(restaurant?.im3)
    const [im4, setIm4] = useState(restaurant?.im4)
    const [im5, setIm5] = useState(restaurant?.im5)
    const [im6, setIm6] = useState(restaurant?.im6)







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

        if (im3) {
            if (
                !(
                    im3.endsWith('.png') ||
                    im3.endsWith('.jpg') ||
                    im3.endsWith('.jpeg')
                )
            ) {
                newErrors.im2 = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (im4) {
            if (
                !(
                    im4.endsWith('.png') ||
                    im4.endsWith('.jpg') ||
                    im4.endsWith('.jpeg')
                )
            ) {
                newErrors.im4 = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (im5) {
            if (
                !(
                    im5.endsWith('.png') ||
                    im5.endsWith('.jpg') ||
                    im5.endsWith('.jpeg')
                )
            ) {
                newErrors.im5 = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (im6) {
            if (
                !(
                    im6.endsWith('.png') ||
                    im6.endsWith('.jpg') ||
                    im6.endsWith('.jpeg')
                )
            ) {
                newErrors.im6 = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }


        setErrors(newErrors)
        console.log('NewErrors', newErrors)
    }

    const handleSubmit = async (e) => {

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
        if (previewImage) {
            const firstImage = {

                url: previewImage
            }
            restaurantImage.push(firstImage)
        }
        if (image2Url) {
            const secondImage = {

                url: image2Url
            }
            restaurantImage.push(secondImage)
        }
        if (im3) {
            const image3 = {

                url: im3
            }
            restaurantImage.push(image3)
        }
        if (im4) {
            const image4 = {

                url: im4
            }
            restaurantImage.push(image4)
        }
        if (im5) {
            const image5 = {

                url: im5
            }
            restaurantImage.push(image5)
        }
        if (im6) {
            const image6 = {

                url: im6
            }
            restaurantImage.push(image6)
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
                <h4></h4>
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
                <h4></h4>
                {errors?.image2url && <span className="error">{errors?.image2url}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Image 3 Url"
                    value={im3}
                    onChange={e => setIm3(e.target.value)}
                />
                <h4></h4>
                {errors?.im3url && <span className="error">{errors?.im3}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Image 4 Url"
                    value={im4}
                    onChange={e => setIm4(e.target.value)}
                />
                <h4></h4>
                {errors?.im4 && <span className="error">{errors?.im4}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Image 5 Url"
                    value={im5}
                    onChange={e => setIm5(e.target.value)}
                />
                <h4></h4>
                {errors?.im5 && <span className="error">{errors?.im5}</span>}
                <br></br>
                <input
                    type="text"
                    placeholder="Image 6 Url"
                    value={im6}
                    onChange={e => setIm6(e.target.value)}
                />
                <h4></h4>
                {errors?.im6 && <span className="error">{errors?.im6}</span>}
                <br></br>
                <button type='submit' className="create-button">Update Shop</button>
            </form>
        </section>
    )
}

export default UpdateRestaurant



