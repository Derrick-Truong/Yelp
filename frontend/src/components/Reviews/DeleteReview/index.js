import { useModal } from "../../../Context/Modal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOneReview } from "../../../store/review";



const DeleteReview = ({reviewId}) => {
const dispatch = useDispatch()
const {closeModal} = useModal()

const handleDelete = async(e) => {
    e.preventDefault()
    dispatch(deleteOneReview(reviewId)).then(closeModal)
}

const handleCancel = (e) => {
    e.preventDefault()
    closeModal()
}


    return (
        <div className="form-div-delete">
            <h1 className="title">Are you sure you want to delete this beautiful review??</h1>
            {/* {errors.length > 0 && (
                <ul className="errors">
                    {errors. ((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )} */}
            <form onSubmit={handleDelete} className="form">
                <button type="submit" className="submit-button" id="deleteSpot-button">
                    Yes
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    No
                </button>
            </form>
        </div>
    );
}

export default DeleteReview
