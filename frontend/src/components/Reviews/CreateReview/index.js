
import { useModal } from "../../../Context/Modal"
import { createOneReview } from "../../../store/review"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getReviews } from "../../../store/review"
import './CreateReview.css'

const CreateReview = ({ restaurantId }) => {
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [url, setUrl] = useState('')
    const { closeModal } = useModal();


    const onSubmit = async (e) => {
        e.preventDefault()

        const review = {
            rating: rating,
            description: description
        }
        const handleCancel = (e) => {
            e.preventDefault();
            closeModal();
        };
        const image = {
            url: url
        }
        dispatch(createOneReview(review, image, restaurantId))
        dispatch(getReviews(restaurantId))

    }
    return (
        <div className='create-review-container'>
            <form onSubmit={onSubmit}>
                <h1 className='create-review-title'>How was your experience?</h1>
                <div className='create-review-rating'>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : (2 > rating && rating >= 1) ? { color: '#d11b0a' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(1)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : (3 > rating && rating >= 2) ? { color: '#f19812' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(2)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : (4 > rating && rating >= 3) ? { color: '#f1ed12' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(3)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : (5 > rating && rating >= 4) ? { color: '#6aff07' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(4)}></i>
                    <i style={(rating >= 5) ? { color: '#43a700' } : { color: '#fff' }} className="fa-solid fa-ice-cream" onClick={() => setRating(5)}></i>
                </div>
                <br></br>
                <textarea
                    rows="10" cols="60"
                    placeholder='Write down any thoughts...'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </form>
        </div>
    )

}

export default CreateReview

