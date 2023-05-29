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
    const [image2Url, setImage2Url] = useState('');
    const [im3, setIm3] = useState("")
    const [im4, setIm4] = useState("")
    const [im5, setIm5] = useState("")
    const [im6, setIm6] = useState("")

    const [isPhotosOpen, setIsPhotosOpen] = useState(false);
    const [images, setImages] = useState([]);

    const togglePhotosDropdown = () => {
        setIsPhotosOpen(!isPhotosOpen);
      };

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
        if (!description) {
            newErrors.description = "Description is required."
        }
        if (!title) {
            newErrors.title = "Title is required."
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

        if(im3){
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
    const handleAddPhoto = () => {
        setImages((prevImages) => [...prevImages, ""]);
      };

      const handlePhotoChange = (index, event) => {
        const newImages = [...images];
        newImages[index] = event.target.value;
        setImages(newImages);
      };

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

        const firstImage = {
            preview: true,
            url: previewImage
        }
        restaurantImage.push(firstImage)

        const secondImage = {
            preview: false,
            url: image2Url || 'https://yelp-capstone.s3.us-west-1.amazonaws.com/no-photo-image.jpg'
        }
        restaurantImage.push(secondImage)


        const image3 = {
            preview: false,
            url: im3 || 'https://yelp-capstone.s3.us-west-1.amazonaws.com/no-photo-image.jpg'
        }
        restaurantImage.push(image3)


        const image4 = {
            preview: false,
            url: im4 || 'https://yelp-capstone.s3.us-west-1.amazonaws.com/no-photo-image.jpg'
        }
        restaurantImage.push(image4)


        const image5 = {
            preview: false,
            url: im5 || 'https://images-ext-2.discordapp.net/external/ugB5ZrnkEUSqYhqH4Q_wCODFhiIp6Z1xDA6hyt_rpkM/%3Fresponse-content-disposition%3Dinline%26X-Amz-Security-Token%3DIQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMSJHMEUCICKcx9PUIheRs3wbqUk2TI4lmcfuyQSzMCePv0ro6aMLAiEAoaxlthjkrAbccwKRqd%252F7iF2gre0M1GGv0vepF%252FvNRA4q5AIIchAAGgw5ODIzNTQ1NTY4ODIiDKOl2hUqIP%252BAaNcZWCrBAuprwcwkDttZyHCsMPkrq3%252BuFDYm1rNggigq%252Bz7oIfVkY3Jahte3JSbbpkdZ5ANDXWWMwLJSpbCd%252FUaVA%252BSke8Jr2AZbdkcYZE5ynW5i23eFTQmjCtrreFZ6Lu6DBcGG1wLloGIfYROz3jJ5figpUYJ4P6J3Ns0odGLkpcnCwpa%252F4PuvT%252Fu6juRdvd5lVFpDXQS1brMiLGiOR4eqMAaj0kQBNzd24ObNqTMZPNSn8mIABV11Dj4ACFg7FLkq8VsujBZQQtMhcd8O1lHOvGtxkWeeTuX863iC4YAlwOb3Zp0VqBW0n4cG0YO%252FL8vPp3VVAYwx%252Bxazd8eBotBOvN8wc%252Bd1fMi6iRrga%252BLkQ8BrfY0cwwLBjhXU87VGKPdl4igIGDZeKD0kam%252FaTSZiBLnDV0mXF65l28MwpCR4o0gpNMMrATD2xtGjBjqzAtEJEbTGdg1w65CtlSpTTJEK4WIJMXAHGZraGZe%252F3x4UcmAYCHyQyYxZuig%252F6hFn6CKHu6Sfr5buvSeqDb%252BYM3FT9LhFC8s4KZRTH%252FToKLGs%252FWGXH4pz1pzA0iudP8CKPi0FUEDzY5B0szrT1poiZNKD3IoSR0QvHTLiONjAuCB7ZhomXUPL7g8fdLxBiXY7iEN%252Fmd1t93HZaELPxoBAUyJmx6IIBr1PW%252FnsLh%252FhOT36xlKaIeIbqh2TzhM64T5UTUfAeXpPpxVge00GEJF3t2rEm9v%252F7vsjqgWVJYAfS0ZJhI9YqhggbkHltVfRUPi7yVhDoFUXiWXG9zO%252BsgKSdsdy9cUfrGzYPllY1RuoILEGgNEoGMm%252F%252FBE5lTjv8mvuL8QV0w%252BF4S7fbAw6EarDWx4eEAs%253D%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Date%3D20230529T125940Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D300%26X-Amz-Credential%3DASIA6JOHE67JEJWL7MNQ%252F20230529%252Fus-west-1%252Fs3%252Faws4_request%26X-Amz-Signature%3D4aaa8b2f8df5c196bd19199a2d52b4df7125ce4ec9cdca16532f0f51db028917/https/d-yelp.s3.us-west-1.amazonaws.com/no-photo.jpg?width=753&height=675'
        }
        restaurantImage.push(image5)


        const image6 = {
            preview: false,
            url: im6 || 'https://images-ext-2.discordapp.net/external/ugB5ZrnkEUSqYhqH4Q_wCODFhiIp6Z1xDA6hyt_rpkM/%3Fresponse-content-disposition%3Dinline%26X-Amz-Security-Token%3DIQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMSJHMEUCICKcx9PUIheRs3wbqUk2TI4lmcfuyQSzMCePv0ro6aMLAiEAoaxlthjkrAbccwKRqd%252F7iF2gre0M1GGv0vepF%252FvNRA4q5AIIchAAGgw5ODIzNTQ1NTY4ODIiDKOl2hUqIP%252BAaNcZWCrBAuprwcwkDttZyHCsMPkrq3%252BuFDYm1rNggigq%252Bz7oIfVkY3Jahte3JSbbpkdZ5ANDXWWMwLJSpbCd%252FUaVA%252BSke8Jr2AZbdkcYZE5ynW5i23eFTQmjCtrreFZ6Lu6DBcGG1wLloGIfYROz3jJ5figpUYJ4P6J3Ns0odGLkpcnCwpa%252F4PuvT%252Fu6juRdvd5lVFpDXQS1brMiLGiOR4eqMAaj0kQBNzd24ObNqTMZPNSn8mIABV11Dj4ACFg7FLkq8VsujBZQQtMhcd8O1lHOvGtxkWeeTuX863iC4YAlwOb3Zp0VqBW0n4cG0YO%252FL8vPp3VVAYwx%252Bxazd8eBotBOvN8wc%252Bd1fMi6iRrga%252BLkQ8BrfY0cwwLBjhXU87VGKPdl4igIGDZeKD0kam%252FaTSZiBLnDV0mXF65l28MwpCR4o0gpNMMrATD2xtGjBjqzAtEJEbTGdg1w65CtlSpTTJEK4WIJMXAHGZraGZe%252F3x4UcmAYCHyQyYxZuig%252F6hFn6CKHu6Sfr5buvSeqDb%252BYM3FT9LhFC8s4KZRTH%252FToKLGs%252FWGXH4pz1pzA0iudP8CKPi0FUEDzY5B0szrT1poiZNKD3IoSR0QvHTLiONjAuCB7ZhomXUPL7g8fdLxBiXY7iEN%252Fmd1t93HZaELPxoBAUyJmx6IIBr1PW%252FnsLh%252FhOT36xlKaIeIbqh2TzhM64T5UTUfAeXpPpxVge00GEJF3t2rEm9v%252F7vsjqgWVJYAfS0ZJhI9YqhggbkHltVfRUPi7yVhDoFUXiWXG9zO%252BsgKSdsdy9cUfrGzYPllY1RuoILEGgNEoGMm%252F%252FBE5lTjv8mvuL8QV0w%252BF4S7fbAw6EarDWx4eEAs%253D%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Date%3D20230529T125940Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D300%26X-Amz-Credential%3DASIA6JOHE67JEJWL7MNQ%252F20230529%252Fus-west-1%252Fs3%252Faws4_request%26X-Amz-Signature%3D4aaa8b2f8df5c196bd19199a2d52b4df7125ce4ec9cdca16532f0f51db028917/https/d-yelp.s3.us-west-1.amazonaws.com/no-photo.jpg?width=753&height=675'
        }
        restaurantImage.push(image6)



const successStore = await dispatch(createRestaurant(newListing, restaurantImage))

       if(successStore){
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
                    placeholder="Write a summary of your wonderful ice cream shop..."
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
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
                <h4></h4>
                {errors?.previewImage && <span className="error">{errors?.previewImage}</span>}
                <br></br>
                <div
          className="DropdownPhotos"
          onClick={togglePhotosDropdown}
        >
          Add more photos!
        </div>
        {isPhotosOpen && (
  <>
                <input
                    type="text"
                    placeholder="Image 2 Url"
                    value={image2Url}
                    onChange={(e) => setImage2Url(e.target.value)}
                />
                <h4></h4>
                {errors?.image2url && <span className="error">{errors?.image2url}</span>}
                <br></br>

    <input
      type="text"
      placeholder="Image 3 Url"
      value={im3}
      onChange={(e) => setIm3(e.target.value)}
    />
    <h4></h4>
    {errors?.im3url && <span className="error">{errors?.im3}</span>}
    <br></br>
    <input
      type="text"
      placeholder="Image 4 Url"
      value={im4}
      onChange={(e) => setIm4(e.target.value)}
    />
    <h4></h4>
    {errors?.im4 && <span className="error">{errors?.im4}</span>}
    <br></br>
    <input
      type="text"
      placeholder="Image 5 Url"
      value={im5}
      onChange={(e) => setIm5(e.target.value)}
    />
    <h4></h4>
    {errors?.im5 && <span className="error">{errors?.im5}</span>}
    <br></br>
    <input
      type="text"
      placeholder="Image 6 Url"
      value={im6}
      onChange={(e) => setIm6(e.target.value)}
    />
    <h4></h4>
    {errors?.im6 && <span className="error">{errors?.im6}</span>}
    <br></br>
  </>
)}

            <button type='submit' className="create-button">Create Shop</button>
</form>
</section>
    )
}

export default CreateRestaurant


