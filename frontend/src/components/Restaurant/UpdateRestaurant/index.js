import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useModal } from "../../../Context/Modal";
import { updateOneRestaurant } from "../../../store/restaurants";
import { updateRestaurant } from "../../../store/restaurants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './UpdateRestaurant.css';
import { restaurantDetails } from "../../../store/restaurants";


const UpdateRestaurant = ({ restaurant }) => {
    const [files, setFiles] = useState([])
    const { closeModal } = useModal()
    const restaurantId = restaurant?.id
    const history = useHistory();
    const dispatch = useDispatch();
    const [city, setCity] = useState(restaurant?.city);
    const [state, setState] = useState(restaurant?.state);
    const [country, setCountry] = useState(restaurant?.country);
    const [title, setTitle] = useState(restaurant?.title);
    const [address, setAddress] = useState(restaurant?.address);
    const [errors, setErrors] = useState([])
    const [description, setDescription] = useState(restaurant?.description);
    const [price, setPrice] = useState(restaurant?.price);
    const [files1, setFile1] = useState(null);
    const [files2, setFile2] = useState(null);
    const [files3, setFile3] = useState(null);
    const [files4, setFile4] = useState(null);
    const [files5, setFile5] = useState(null);
    const [files6, setFile6] = useState(null);

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };
    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
    };
    const handleFile3Change = (e) => {
        setFile3(e.target.files[0]);
    };
    const handleFile4Change = (e) => {
        setFile4(e.target.files[0]);
    };
    const handleFile5Change = (e) => {
        setFile5(e.target.files[0]);
    };
    const handleFile6Change = (e) => {
        setFile6(e.target.files[0]);
    };
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
        if (!description) {
            newErrors.description = "Description is required."
        }


        if (!title) {
            newErrors.title = "Title is required."
        }
        if (price && !(parseInt(price))) {
            newErrors.price = "Price is required needs to be a number."
        }
        setErrors(newErrors)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        valid()
        if (Object.keys(errors).length > 0) {
            return
        }
        const form = new FormData();

        //     if(files && files.length > 0){
        //     for (let i = 0; i < files.length; i++) {
        //         form.append('image', files[i])
        //     }
        // }
        form.append('country', country)
        form.append('state', state)
        form.append('address', address)
        form.append('city', city)
        form.append('price', price.toString())
        form.append('title', title)
        form.append('description', description)
        if (files1) {
            form.append('image1', files1)
        }

        if (files2) {
            form.append('image2', files2)
        }

        if (files3) {
            form.append('image3', files3)
        }

        if (files4) {
            form.append('image4', files4)
        }

        if (files5) {
            form.append('image5', files5)
        }

        if (files6) {
            form.append('image6', files6)
        }
        // const newListing = {
        //     country: country,
        //     description: description,
        //     price: price,
        //     title: title,
        //     address: address,
        //     city: city,
        //     state: state
        // }
        // formData.append('newlisting', newListing)



        await dispatch(updateOneRestaurant(form, restaurantId))
        await (dispatch(restaurantDetails(restaurantId))).then(closeModal)
    }
    return (
        <section className="create-restaurant-page">
            <div className="title-update-form">Update Ice Cream Shop</div>
            <form encType="multipart/form-data" className="create-restaurant-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"

                    name='country'
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                />

                {errors?.country && <span className="error">{errors?.country}</span>}


                <input
                    className="input"

                    type="text"
                    name='state'
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    required
                />

                {errors?.state && <span className="error">{errors?.state}</span>}

                <input
                    className="input"

                    type="text"
                    name='address'
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                />
                {errors?.address && <span className="error">{errors?.address}</span>}

                <input
                    className="input"

                    type="text"
                    name='city'
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                />
                {errors?.city && <span className="error">{errors?.city}</span>}
                <input
                    className="input"

                    type="number"
                    name='price'
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
                {errors?.price && <span className="error">{errors?.price}</span>}
                <input
                    className="input"

                    type="text"
                    name='title'
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                {errors?.title && <span className="error">{errors?.title}</span>}
                <textarea
                    rows="8" cols="48"
                    name='description'
                    maxLength={100}
                    type="text"
                    placeholder="Write a summary of your wonderful ice cream shop...(100 characters max)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                {errors?.description && <span className="error">{errors?.description}</span>}
                <div className="upload-title"> Add photos of your shop!</div>
                <input className="upload" onChange={handleFile1Change} name='image1' accept="image/*" type="file" />
                <input className="upload" onChange={handleFile2Change} name='image2' accept="image/*" type="file" />
                <input className="upload" onChange={handleFile3Change} name='image3' accept="image/*" type="file" />
                <input className="upload" onChange={handleFile4Change} name='image4' accept="image/*" type="file" />
                <input className="upload" onChange={handleFile5Change} name='image5' accept="image/*" type="file" />
                <input className="upload" onChange={handleFile6Change} name='image6' accept="image/*" type="file" />
                <button type="submit" className="create-restaurant-button">Update</button>
            </form>
        </section>
    )
}

export default UpdateRestaurant



