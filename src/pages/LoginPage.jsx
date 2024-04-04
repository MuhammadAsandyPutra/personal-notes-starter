import React from "react";
import LoginInput from "../components/auth/LoginInput";
import {login} from "../utils/network-data";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const LoginPage = ({loginSuccess}) => {

    async function onLogin({email, password}) {
        const {error,data} = await login({email, password});
        
        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <section className="login-page">
            <h2>Masukkan Akun anda !</h2>
            <LoginInput login={onLogin}/>
            <p>Belum punya akun? <Link to={"/register"}>Daftar di sini</Link></p>
        </section>

    );


}

LoginPage.propTypes = {
    loginSuccess: propTypes.func.isRequired
}

export default LoginPage;