import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils/index";

const NoteDetail = ({ title, body, createdAt }) => {
    const formattedDate = showFormattedDate(createdAt);
    
    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{formattedDate}</p>
            <div className="detail-page__body">{parser(body)}</div>
        </section>
    );
};

NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
};

export default NoteDetail;
