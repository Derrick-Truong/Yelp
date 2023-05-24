import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SignupFormModal.css'
import { signup } from "../../../store/session";



function SignupFormPage() {
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
        setErrors([]);
        if (password === confirmPassword) {
            const data = await dispatch(signup(firstName, lastName, username, email, password));
            if (data && data.errors) {
                setErrors(data.errors)
            }
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    return (
        <>

            <form className='sign-up-form-container' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <br></br>
                <ul>
                    {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        type="text"
                        placeholder='               Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder='            Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder='            First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder='            Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder='            Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder='     Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
