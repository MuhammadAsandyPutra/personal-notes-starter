import React, { useState } from "react";
import PropTypes from "prop-types";

const RegisterInput = ({ register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    };

    return (
        <form action="#" onSubmit={handleSubmit} className="register-input">
            <input type="text" placeholder="Nama" name="name" value={name} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            <button>Register</button>
        </form>
    );
};

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
};

export default RegisterInput;
