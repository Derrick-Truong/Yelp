import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../Context/Modal";
import { useSelector } from "react-redux";
import "./LoginFormModal.css";
import * as sessionActions from "../../../store/session"
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../../../OpenModalButton";


function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    var docs = document.getElementById('img');
    docs?.setAttribute('src', 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTQ2OGY0MDEwYWY3NGU0MGUyMmZiMDZiMzg4M2E4ZWNhZmNhN2VkMCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oz8xwKBsHNlZ6UvMA/giphy.gif')

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res?.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const demoSignIn = async (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({ credential: "Derrick", password: "password" })).then(closeModal)
    }

    return (
        <>
            <div className="frog-login-video">
            </div>
            <div className="log-in-form-below-frog">
                <img

                    autoPlay
                    muted
                    loop
                    playsInline
                    src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTQ2OGY0MDEwYWY3NGU0MGUyMmZiMDZiMzg4M2E4ZWNhZmNhN2VkMCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oz8xwKBsHNlZ6UvMA/giphy.gif'
                    width="200"
                    height="170"
                />
                <h5 className='log-in-form-title'>Enter Credentials And Password</h5>
                <form className="form-log-in" onSubmit={handleSubmit}>
                    <ul>
                        {errors?.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        <input className="credential-and-password-form"
                            type="text"
                            placeholder="credentials"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <h4></h4>
                    <label>

                        <input className="credential-and-password-form"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button className='login-log-in-button' type="submit">Log In</button>

                    <div className="signup-link-in-login-form">
                        Don't have an account yet?
                        <br></br>
                        <div className="submit-button-log-in">
                            <span className='sign-up-modal-button'>
                                <OpenModalButton
                                    buttonText="Sign Up"
                                    modalComponent={<SignupFormModal/>}/></span>
                            <button onClick={demoSignIn} className="demo-sign-in-button" id='demo-user-button'>
                                Demo User
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default LoginFormModal;
