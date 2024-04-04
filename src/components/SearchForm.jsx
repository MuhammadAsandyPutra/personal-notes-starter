import React from "react";
import propTypes from "prop-types";
import {LocaleConsumer} from "../context/LocaleContext";

const SearchForm = ({ value, onChange }) => {
    return (
        <LocaleConsumer>{({
            locale
        }) => {

            return (
                <input
                type="text"
                placeholder={locale === 'id' ? 'Cari catatan anda' : 'search your note'}
                value={value}
                onChange={(event) => onChange(event.target.value)}/>
        );
        }
    }
    </LocaleConsumer>
    );
}

SearchForm.propTypes = { 
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired
}

export default SearchForm;