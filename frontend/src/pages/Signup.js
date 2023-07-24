import './Signup.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { nameValidate, emailValidate, passwordValidate } from '../utils/validation';
import postData from "../api/register";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors  = {};
        if (nameValidate(formData.name) || emailValidate(formData.email) || passwordValidate(formData.password)) {
            validationErrors.name = nameValidate(formData.name);
            validationErrors.email = emailValidate(formData.email);
            validationErrors.password = passwordValidate(formData.password);
        }        
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            postData(formData)
                .then(response => {
                    console.log('Registration successful:', response);
                    setSuccessMessage('Registration successful!');
                })
                .catch(error => {
                    console.error('Error during registration:', error.message);
                    setErrorMessage(error.message);
                });
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    return (
        <div className="wrapper">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = "text" name = "name" placeholder="Name" className="signin-input" onChange={handleChange} />
                    {errors.name && <div className="error-text"><span>{errors.name}</span></div>}
                </div>
                <div>
                    <input type = "email" name = "email" placeholder="Email" className="signin-input" onChange={handleChange} />
                    {errors.email && <div className="error-text"><span>{errors.email}</span></div>}
                </div>
                <div>
                    <input type = "password" name = "password" className="signin-input" placeholder="Password" onChange={handleChange} />
                    {errors.password && <div className="error-text"><span>{errors.password}</span></div>}
                </div>
                <input type = "submit" value = "SIGN UP" className="signin-button" />
            </form>
            <Link to = "/">Back</Link>

            {successMessage && (
                <div className="modal">
                <div className="modal-content">
                    <h2>Success!</h2>
                    <p>{successMessage}</p>
                    <Link to="/">Sign In</Link>
                </div>
                </div>
            )}

            {errorMessage && (
                <div className="modal">
                <div className="modal-content">
                    <h2>Error</h2>
                    <p>{errorMessage}</p>
                    <button onClick={() => setErrorMessage('')}>Close</button>
                </div>
                </div>
            )}
        </div>
    )
}
