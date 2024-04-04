import React, { useState, useEffect, useContext } from "react";
import NoteList from "../components/NoteList";
import { deleteNote, getActiveNotes, getArchivedNotes, archiveNote, unarchiveNote } from "../utils/network-data";
import SearchForm from "../components/SearchForm";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocaleContext";
import Loading from "../state/Loading";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get('keyword') || '');
    const [loading, setLoading] = useState(true);

    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data: activeNotes } = await getActiveNotes();
                const { data: archivedNotes } = await getArchivedNotes();
                setNotes(activeNotes.concat(archivedNotes));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const onDeleteHandler = async (id) => {
        await deleteNote(id);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    const onArchiveHandler = async (id) => {
        await archiveNote(id);
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === id ? { ...note, archived: true } : note
        ));
    };

    const onRestoreHandler = async (id) => {
        await unarchiveNote(id);
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === id ? { ...note, archived: false } : note
        ));
    };

    const onValueChangeHandler = (value) => {
        setValue(value);
        setSearchParams({ keyword: value });
    };

    if (!notes.length) {
        return <p>Catatan Kosong</p>;
    }

    const filteredNotes = value ? notes.filter(note => note.title.toLowerCase().includes(value.toLowerCase())) : notes;

    if(loading){
        return <Loading />;
    }

    return (
        <section>
            <SearchForm value={value} onChange={onValueChangeHandler} />
            <div className="note-app__body">
                <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
                <NoteList notes={filteredNotes.filter(note => !note.archived)} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />
                <h2>{locale === "id" ? "Catatan Arsip" : "Archive Notes"}</h2>
                <NoteList notes={filteredNotes.filter(note => note.archived)} onDelete={onDeleteHandler} onRestore={onRestoreHandler} />
            </div>
        </section>
    );
};

HomePage.propTypes = {
    defaultValue: PropTypes.string,
};

export default HomePage;
