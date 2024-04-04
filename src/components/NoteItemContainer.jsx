import React from "react";
import { showFormattedDate } from "../utils";
import propTypes from "prop-types";
import {Link} from "react-router-dom";
import parser from "html-react-parser";

function NoteItemContainer ({title, body, createdAt, id}) {

    return (
        <div className="note-item__body">
            <h3 className="note-item__title">
                <Link to={`/notes/${id}`}>{title}</Link>
                </h3>
            <p className="note-item__date">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{parser(body)}</p>
        </div>
    );
}

NoteItemContainer.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired
}

export default NoteItemContainer;