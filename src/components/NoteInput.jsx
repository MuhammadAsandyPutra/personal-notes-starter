import React from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import useInput from "../hooks/useInput";
import { LocaleConsumer } from "../context/LocaleContext";

const MyNoteInput = ({ addNote }) => {
    const [title, setTitle] = useInput("");
    const [body, setBody] = useInput("");

    const onSubmitEventHandler = (event) => {
        event.preventDefault();
        addNote({
            title: title,
            body: body
        });
       
        setTitle("");
        setBody("");
    };

    return (
        <LocaleConsumer>
            {({ locale }) => (
                <form action="#" className="note-input" onSubmit={onSubmitEventHandler}>
                    <h2>{locale === 'id' ? 'Buat Catatan' : 'Make Note'}</h2>
                    <p className="note-input__title__char-limit">
                        {locale === 'id' ? 'Karakter tersisa: ' : 'Remaining characters: '}{50 - title.length}
                    </p>
                    <input
                        type="text"
                        className="note-input-title"
                        placeholder={locale === 'id' ? 'Ini adalah judul...' : 'This is the title...'}
                        onChange={setTitle}
                        maxLength={50}
                        value={title}
                        required
                    />
                    <ContentEditable
                        className="note-input-body"
                        html={body}
                        onChange={setBody}
                        placeholder={locale === 'id' ? 'Tuliskan catatanmu disini !' : 'Write your note here!'}
                    />
                    <button type="submit">{locale === 'id' ? 'Buat Catatan' : 'Make Note'}</button>
                </form>
            )}
        </LocaleConsumer>
    );
};

MyNoteInput.propTypes = {
    addNote: PropTypes.func.isRequired
};

export default MyNoteInput;
