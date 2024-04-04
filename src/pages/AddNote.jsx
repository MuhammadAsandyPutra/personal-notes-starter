import React from "react";
import {addNote} from "../utils/network-data";
import {useNavigate} from "react-router-dom";

import NoteInput from "../components/NoteInput";

const AddNote = () => {
    const navigate = useNavigate();
    async function onAddNoteHandler(note){
        await addNote(note);
        navigate('/');
    }

    return (
        <section>
            <NoteInput addNote={onAddNoteHandler}/>
        </section>
    );
}

export default AddNote;