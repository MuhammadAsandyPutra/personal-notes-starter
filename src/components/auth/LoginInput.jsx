import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginInput = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <form action="#" onSubmit={handleSubmit} className="login-input">
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            <button>Login</button>
        </form>
    );
};

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginInput;
