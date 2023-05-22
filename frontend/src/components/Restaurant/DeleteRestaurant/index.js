import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../Context/Modal";
import { useState } from "react";
import { removeRestaurant } from "../../../store/restaurants";

export default function DeleteRestaurant({restaurantId}){
const dispatch = useDispatch();
const history = useHistory();
const {closeModal} = useModal()

const handleDelete = async(e) => {
    e.preventDefault();
    dispatch(removeRestaurant(restaurantId)).then(closeModal)
}

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };
return (
    <div className="form-div-delete">
        <h1 className="title">Are you sure you want to delete this spot?</h1>
        <form onSubmit={handleDelete} className="form">
            <button type="submit" className="delete-restaurant-submit-button">
                Yes, (delete this restaurant)
            </button>
            <button className="delete-restaurant-cancel-button" onClick={handleCancel}>
                No, (keep restaurant)
            </button>
        </form>
    </div>
)
}
