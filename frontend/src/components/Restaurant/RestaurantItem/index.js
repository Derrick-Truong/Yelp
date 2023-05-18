
import { useState, useEffect } from 'react';
import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../../../OpenModalButton';






const RestaurantItem = ({ restaurant }) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.session?.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef?.current?.contains(e?.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dispatch, showMenu]);


    const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (
        <div>
            <div className="restaurant-header">

                <div className="username-unfollow-follow">
                </div>
            </div>
            <h4 className="restaurant-item-restaurantTitle">{restaurant?.title}</h4>
            <p className="restaurant-content">
                {restaurant?.description}
            </p>
            <div className="restaurant-footer">






                <span></span><span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>

            </div>
            <div className="dropdown m-10">
                <ul className={ulClassNameUpdateDelete} ref={ulRef}>
                    {restaurant?.comments?.length ?

                        restaurant?.comments?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {

                            return (
                                <li key={comment.id}>
                                    <div className="list-for-update-delete">
                                        <div className="trash-comment">
                                            <div className="comment-text-bubble">
                                                <span className="comment-owner">{comment.owner.username}</span>
                                                <div className="the-comments-commented">

                                                    <span>{comment?.content}</span>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        </div >
    )
}

export default RestaurantItem
