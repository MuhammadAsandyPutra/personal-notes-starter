import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiHome, FiPlusCircle } from "react-icons/fi";
import propTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navigation = ({ logout, name }) => {
    return (
        <LocaleConsumer>
            {({ locale, toggleLocale, theme, toggleTheme }) => (
                <nav className="navigation">
                    <ul>
                        <li><button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button></li>
                        <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
                        <li>
                            <Link to="/"><FiHome /></Link>
                        </li>
                        <li>
                            <Link to="/add"><FiPlusCircle /></Link>
                        </li>
                        <li><button onClick={logout}>{name}<FiLogOut /></button></li>
                    </ul>
                </nav>
            )}
        </LocaleConsumer>
    );
}

Navigation.propTypes = {
    logout: propTypes.func.isRequired,
    name: propTypes.string.isRequired
}

export default Navigation;
