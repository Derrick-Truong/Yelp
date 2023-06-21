import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../Context/Modal";
import { useState } from "react";
import { removeRestaurant } from "../../../store/restaurants";
import './DeleteRestaurant.css'

export default function DeleteRestaurant({restaurantId}){
const dispatch = useDispatch();
const history = useHistory();
const {closeModal} = useModal()

const handleDelete = async(e) => {
    e.preventDefault();
    dispatch(removeRestaurant(restaurantId))
    closeModal()
    history.push('/')
}

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };
    return (
        <>
            <section>
                <div className="form-div-delete">
                    <h1 className="title">Are you sure you want to delete your icecream shop?</h1>
                    {/* {errors.length > 0 && (
                <ul className="errors">
                    {errors. ((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )} */}
                    <form onSubmit={handleDelete} className="form">
                        <button type="submit" className="submit-delete-button" id="deleteSpot-button">
                            Yes
                        </button>
                        <button type="button" className="cancel-delete-button" onClick={handleCancel}>
                            No
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
