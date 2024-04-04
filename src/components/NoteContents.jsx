import React from "react";
import propTypes from "prop-types";

function NoteContents({title, createdAt, body}) {
    return (
        <div className="note-item__content">
            <h1>{title}</h1>
            <span>{createdAt} </span>
            <p>{body}</p>
        </div>
    );


}

NoteContents.propTypes = {
    title: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    body: propTypes.string.isRequired
}

export default NoteContents;