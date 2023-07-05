import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../User/LoginFormModal";
import SignupFormPage from "../User/SignupFormModal";
import Profile from "../User/Profile";
import { useHistory } from "react-router-dom";
import './ProfileButton.css'
import { NavLink } from "react-router-dom";



function ProfileButton({ user }) {


    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();



    // useEffect(() => {
    //     dispatch(getCurrentSpots())
    // }, [dispatch])



    // useEffect(() => {
    //     dispatch(getCurrentSpots(user.id))
    // }, [dispatch])
    // const manage = () => {
    //     for (let spot of currentVal) {
    //         if (user.id === spot.ownerId) {
    //             return true
    //         }
    //     }

    // }
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="profile-button-container" onClick={openMenu}>
                <i className="fa-solid fa-ice-cream"></i>
            </div>

            <div className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="log-sign-up-name">
                            Hello, {user?.username}</div>
                        <hr class="new1"></hr>
                        <div className="log-sign-up">
                            <button className="sign-out-button" onClick={logout}>Log Out</button>
                        </div>
                    </>

                ) : (
                    <>
                        <div className="log-sign-up">
                            <OpenModalButton className="button-for-login"
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                        <div className="log-sign-up">
                            <OpenModalButton
                                buttonText="Sign Up"
                                modalComponent={<SignupFormPage />}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ProfileButton;
