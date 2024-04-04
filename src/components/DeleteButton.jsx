import React from "react";
import propTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";


function DeleteButton({onDelete, id}) {
    return (
        <LocaleConsumer>
            {({locale}) => (

                <button className="note-item__delete-button" onClick={() => onDelete(id)}>{locale === 'id' ? 'Hapus' : 'Delete'}</button>

            )}
        
        </LocaleConsumer>
    );
}

DeleteButton.propTypes = {
    onDelete: propTypes.func.isRequired,
    id: propTypes.string.isRequired
}

export default DeleteButton;