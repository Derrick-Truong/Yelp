
import { useModal } from "../../../Context/Modal"
import { createOneReview } from "../../../store/review"
import { useState } from "react"
import { updateOneReviewNoPic } from "../../../store/review"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { restaurantDetails } from "../../../store/restaurants"
import { getReviews } from "../../../store/review"
import Yelp from "../../../assets/Yelp.jpg"
import './UpdateReview.css'



const UpdateReview = ({review, restaurantId}) => {
    const {restaurantId} = useParams()
    const reviewId = review?.id
    const dispatch = useDispatch()
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

// useEffect(() => {
//    setDescription(review?.description)
//    setRating(review?.rating)
//    setUrl(review?.previewImage)

// },[JSON.stringify(review), JSON.stringify(review?.rating), JSON.stringify(review?.description)])


    const valid = () => {
        let newErrors = {}
        if (!description.length) {
            newErrors.description = 'Description is required'
        }
        if (rating > 5 || rating < 1) {
            newErrors.rating = 'Rating must be between 1 and 5'
        }
        // if (url) {
        //     if (!
        //         (
        //            url.endsWith('png') ||
        //            url.endsWith('.jpg') ||
        //            url.endsWith('.jpg')
        //         )) {
        //         newErrors.url = 'Preview must end in .png, .jpg, or .jpeg'
        //     }

        // }
        setErrors(newErrors)
        console.log('Errors', newErrors)
    }

const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };
    const onSubmit = async (e) => {
        e.preventDefault()

        valid()
        if (Object.keys(errors).length > 0) {
          return
        }
        const review = {
            rating: rating,
            description: description
        }

        // const image = {
        //     url: url || 'https://as1.ftcdn.net/v2/jpg/04/66/51/96/1000_F_466519636_dq4qvu88Lbn9BUF1Pgz9KZp5JnIdEzDX.jpg'
        // }


        await dispatch(updateOneReviewNoPic(review, reviewId))
        await dispatch(getReviews(restaurantId)).then(closeModal)



    }
    return (
        <section>
            <form className='update-review-container'>
                <h1 className='update-review-title'>How was your experience?</h1>
                <br></br>
                <div className='update-review-rating'>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : (2 > rating && rating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(1)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(2)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(3)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(4)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(5)}></i>
                </div>
                <br></br>
                <div>
                    <textarea
                        rows="8" cols="60"
                        placeholder={review?.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {errors?.description && <span className="error">{errors?.description}</span>}

                {/* <h3 className='update-review-upload-pic'>Didn't Like the Pic You Took Huh?</h3> */}

                {/* <input className='update-review-photo-url-input' placeholder={review?.previewImage} value={url} onChange={(e) => setUrl(e.target.value)}/> */}

                <h4>{errors?.url && <span className="error">{errors?.url}</span>}</h4>


                <div className='update-review-thumbs-up-down'><span><i onClick={onSubmit} style={{ color: '#05e13c' }} className="fa-solid fa-thumbs-up"></i></span><span><i onClick={handleCancel} style={{ color: '#e10505' }} className="fa-solid fa-thumbs-down"></i></span></div>
            </form>
            {/* <div className='create-review-thumbs-up-down'><span><i className="fa-solid fa-thumbs-up"></i></span><span><i className="fa-solid fa-thumbs-down"></i></span></div> */}
        </section>
    )
}

export default UpdateReview
