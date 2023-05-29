import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SignupFormModal.css'
import * as sessionActions from "../../../store/session";
import { useModal } from "../../../Context/Modal";
import { useHistory } from "react-router-dom";


function SignupFormPage() {
    const history = useHistory()
    const {closeModal} = useModal()
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 1) {
            setErrors(["Password is required."]);
            return;
        }

        if (username.length < 1) {
            setErrors(["Username is required"]);
            return;
        }
        setErrors([]);
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
                .then(history.push("/"));
        }
        setErrors(["Confirm Password field must be the same as the Password field."]);

    };

    return (
        <>
            <form className='sign-up-form-container' onSubmit={handleSubmit}>
                {errors?.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                <h1>Sign Up</h1>
                <br></br>
                <label>
                    <input
                        type="text"
                        placeholder='               Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="text"
                        placeholder='            Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="text"
                        placeholder='            First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="text"
                        placeholder='            Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="password"
                        placeholder='            Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="password"
                        placeholder='     Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <br></br>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
