import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { emailValidate, passwordValidate } from '../utils/validation';
import login from '../api/login';

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    console.log(formData)
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors  = {};
        if (emailValidate(formData.email) || passwordValidate(formData.password)) {
            validationErrors.email = emailValidate(formData.email);
            validationErrors.password = passwordValidate(formData.password);
        } 
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            login(formData)
                .then(response => {
                    console.log('Registration successful:', response);
                    const { jwt, name, id } = response;
                    localStorage.setItem('jwt', jwt);
                    localStorage.setItem('username', name);
                    localStorage.setItem('id', id);
                    navigate('/user');
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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = "email" name = "email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error-text"><span>{errors.email}</span></div>}
                </div>
                <div>
                    <input type = "password" name = "password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="error-text"><span>{errors.password}</span></div>}
                </div>
                <input type = "submit" value = "SIGN IN"/>
            </form>
            <p> Don't have an account? <Link to="/register">SIGN UP</Link></p>
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
