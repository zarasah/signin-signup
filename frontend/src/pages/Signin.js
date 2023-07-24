import './Signin.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { emailValidate, passwordValidate } from '../utils/validation';
import login from '../api/login';
import getGoogleUrl from "../utils/getGoogleUrl";
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [accessToken, setAccessToken] = useState(null); //

    function setAccessTokenFromURL() {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        const username = searchParams.get('username');
  
        if (token) {
          setAccessToken(token);
          localStorage.setItem('jwt', token);
          localStorage.setItem('username', username);
          navigate('/user');
        }
      }
  
      useEffect(() => {
        setAccessTokenFromURL();
      }, []);

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
        <div className="wrapper">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = "email" name = "email" placeholder="Email" className="signin-input" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error-text"><span>{errors.email}</span></div>}
                </div>
                <div>
                    <input type = "password" name = "password" placeholder="Password" className="signin-input" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="error-text"><span>{errors.password}</span></div>}
                </div>
                <input type = "submit" value = "SIGN IN" className="signin-button"/>
            </form>
            <div className="separator">
                <hr />
                <span className="separator-text">OR</span>
                <hr />
            </div>
            <div>
                <Link to = {getGoogleUrl()} className="signin-google-button"><span className="google-icon"> <FcGoogle/> </span>Sing up with google</Link>
            </div>
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
