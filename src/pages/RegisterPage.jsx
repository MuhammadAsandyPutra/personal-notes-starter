import React from "react";
import {Link, useNavigate} from "react-router-dom";
import RegisterInput from "../components/auth/RegisterInput";
import { register } from "../utils/network-data"


const RegisterPage = () => {
    const navigate = useNavigate();

    
    async function onRegisterHandler(user) {
        const {error} = await register(user);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <section className="register-page">
            <h2>Daftarkan Akun anda !</h2>
            <RegisterInput register={onRegisterHandler}/>
            <p>Kembali ke <Link to={"/"}>Masuk</Link></p>
        </section>
    );
}

export default RegisterPage;