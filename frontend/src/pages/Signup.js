import { useState } from "react";
import { Link } from 'react-router-dom';
import { nameValidate, emailValidate, passwordValidate } from '../utils/validation';
import postData from "../api/api";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});

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
            console.log('if')
            postData(formData);
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = "text" name = "name" placeholder="Name" onChange={handleChange} />
                    {errors.name && <div className="error-text"><span>{errors.name}</span></div>}
                </div>
                <div>
                    <input type = "email" name = "email" placeholder="Email" onChange={handleChange} />
                    {errors.email && <div className="error-text"><span>{errors.email}</span></div>}
                </div>
                <div>
                    <input type = "password" name = "password" placeholder="Password" onChange={handleChange} />
                    {errors.password && <div className="error-text"><span>{errors.password}</span></div>}
                </div>
                <input type = "submit" value = "SIGN UP" />
            </form>
            <Link to = "/">Back</Link>
        </div>
    )
}
