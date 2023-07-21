import { useState } from "react";
import { Link } from 'react-router-dom';
import { emailValidate, passwordValidate } from '../utils/validation';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    console.log(formData)
    const [errors, setErrors] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors  = {};
        validationErrors.email = emailValidate(formData.email);
        validationErrors.password = passwordValidate(formData.password);
        setErrors(validationErrors);
        
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
        </div>
    )
}
