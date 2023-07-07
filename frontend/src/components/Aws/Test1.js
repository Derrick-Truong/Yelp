import React from "react";
import { createNewRestaurant } from "../../store/restaurants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../Context/Modal";
import { submitData } from "../../store/restaurants";
import white from "../../assets/white.jpg"
import './CreateRestaurant.css'
const Test1 = () => {
    const { closeModal } = useModal()
    const history = useHistory();
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [previewImage, setPreviewImage] = useState();
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const [files1, setFile1] = useState(null);
    const [files2, setFile2] = useState(null);
    const [files3, setFile3] = useState(null);
    const [files4, setFile4] = useState(null);
    const [files5, setFile5] = useState(null);
    const [files6, setFile6] = useState(null);
    const imgRef1 = useRef(null);
    const imgRef2 = useRef(null);
    const imgRef3 = useRef(null);
    const imgRef4 = useRef(null);
    const imgRef5 = useRef(null);
    const imgRef6 = useRef(null);
    let img = document.getElementById('img')
    let input = document.getElementById('input')

    let img2 = document.getElementById('img2')
    let input2 = document.getElementById('input2')

    let img3 = document.getElementById('img3')
    let input3 = document.getElementById('input3')

    let img4 = document.getElementById('img4')
    let input4 = document.getElementById('input4')

    let img5 = document.getElementById('img5')
    let input5 = document.getElementById('input5')

    let img6 = document.getElementById('img6')
    let input6 = document.getElementById('input6')
    // const priceValue = price
    // const priceString = priceValue.toString()
    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef1.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef2.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleFile3Change = (e) => {
        setFile3(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef3.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleFile4Change = (e) => {
        setFile4(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef4.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleFile5Change = (e) => {
        setFile5(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef5.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleFile6Change = (e) => {
        setFile6(e.target.files[0]);
        if (e.target.files[0]) {
            imgRef6.current.src = URL.createObjectURL(e.target.files[0]);
        }
    };
    const valid = async() => {

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
            newErrors.price = "Price is required."
        }
        if (!description) {
            newErrors.description = "Description is required."
        }


        if (!title) {
            newErrors.title = "Title is required."
        }
        if (price && !(parseInt(price))) {
            newErrors.price = "Price must be a number."
        }
        setErrors(newErrors)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await valid();
        if (Object.keys(errors).length > 0) {
            return; // Prevent form submission if there are errors
        }
        const form = new FormData();

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


        const newSpot = await dispatch(createNewRestaurant(form))

        if(newSpot?.id){
        history.push(`/restaurants/${newSpot?.id}`)
        closeModal()
        }
        // if (newSpot.id) {
        //     await closeModal()
        //     await history.push(`/restaurants/${newSpot?.id}`)
        // }

        // const newSpot = await dispatch(createNewRestaurant(form)).then(closeModal).then(history.push(`/restaurants/${newSpot?.id}`))history.push(`/restaurants/${newSpot?.id}`);

    }


    return (
        <section className="create-restaurant-page">
            <div className="title-update-form">Create An Ice Cream Shop Listing</div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-restaurant-form">
                <div>
                    <input
                        type="text"
                        className="input"
                        name='country'
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
        required
                    />
                </div>
                <div>{errors.country && <div className="error">{errors.country}</div>}</div>
                <div>
                    <input
                        className="input"
                        type="text"
                        name='state'
                        placeholder="State"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </div>
                <div>{errors.state && <div className="error">{errors.state}</div>}</div>
                <div>
                    <input
                        className="input"
                        type="text"
                        name='address'
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>{errors.address && <div className="error">{errors.address}</div>}</div>
                <div>

                    <input
                        className="input"

                        type="text"
                        name='city'
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </div>

                <div>{errors.city && <div className="error">{errors.city}</div>}</div>
                <div>

                    <input

                        className="input"
                        type="number"
                        name='price'
                        placeholder="Price per cone"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>{errors.price && <div className="error">{errors.price}</div>}</div>
                <div>

                    <input
                        className="input"
                        type="text"
                        name='title'
                        placeholder="Title"
                        value={title}
                        onChange={e =>setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>{errors.title && <div className="error">{errors.title}</div>}</div>
                <div className="create-restaurant-textarea">

                    <textarea

                        rows="8" cols="48"
                        name='description'
                        type="text"
                        placeholder=" Write a summary of your wonderful ice cream shop..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>{errors.description && <div className="error">{errors.description}</div>}</div>
                <div className="add-photos-title"> Add at least 1 photo of your shop!</div>
                <input id="input" className="upload" onChange={handleFile1Change} name='image1' accept="image/*" type="file" required/>
                <input id="input2" className="upload" onChange={handleFile2Change} name='image2' accept="image/*" type="file" />
                <input id="input3" className="upload" onChange={handleFile3Change} name='image3' accept="image/*" type="file" />
                <input id="input4" className="upload" onChange={handleFile4Change} name='image4' accept="image/*" type="file" />
                <input id="input5" className="upload" onChange={handleFile5Change} name='image5' accept="image/*" type="file" />
                <input id="input6" className="upload" onChange={handleFile6Change} name='image6' accept="image/*" type="file" />
                <div className="preview-images-title">Preview of Images</div>
                <div className="gallery">
                    <img ref={imgRef1} src={white} alt="" />
                    <img ref={imgRef2} src={white} alt="" />
                    <img ref={imgRef3} src={white} alt="" />
                    <img ref={imgRef4} src={white} alt="" />
                    <img ref={imgRef5} src={white} alt="" />
                    <img ref={imgRef6} src={white} alt="" />
                </div>
                <button type="submit" className="create-restaurant-button">Create</button>
                <div className="create-button-bottom">Will be routed to your ice cream page upon creation</div>
                <br></br>
            </form>
        </section>
    )
}

export default Test1
