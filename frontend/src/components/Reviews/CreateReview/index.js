
import { useModal } from "../../../Context/Modal"
import { createOneReview } from "../../../store/review"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getReviews } from "../../../store/review"
import './CreateReview.css'

const CreateReview = ({restaurantId}) => {

    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [url, setUrl] = useState('')
    const { closeModal } = useModal();

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };
    const onSubmit = async (e) => {
        e.preventDefault()

        const review = {
            rating: rating,
            description: description
        }

        const image = {
            url: url
        }
        dispatch(createOneReview(review, image, restaurantId))
        // dispatch(getReviews(restaurantId))
        closeModal()
        // dispatch(getReviews(restaurantId))

    }
    return (
        <section>
            <form className='create-review-container'>
                <h1 className='create-review-title'>How was your experience?</h1>
                <div className='create-review-rating'>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : (2 > rating && rating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(1)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(2)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(3)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(4)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(5)}></i>
                </div>
                <br></br>
                <div>
                <textarea
                    rows="10" cols="60"
                    placeholder='Write down any thoughts...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </div>
                <h3 className='create-review-upload-pic'>Any Picture You Want To Upload?</h3>
                <input className='create-review-photo-url-input' placeholder='Pic pls...' value={url} onChange={(e) => setUrl(e.target.value)} />
                <h4></h4>
                <div className='create-review-thumbs-up-down'><span><i onClick={onSubmit} style={{ color: '#05e13c' }} className="fa-solid fa-thumbs-up"></i></span><span><i onClick={handleCancel} style={{ color: '#e10505' }} className="fa-solid fa-thumbs-down"></i></span></div>
            </form>
            {/* <div className='create-review-thumbs-up-down'><span><i className="fa-solid fa-thumbs-up"></i></span><span><i className="fa-solid fa-thumbs-down"></i></span></div> */}
        </section>
    )

}

export default CreateReview

