import React from "react";
import NoteItem from "./NoteItem";
import propTypes from "prop-types";
import { archiveNote, unarchiveNote } from "../utils/local-data";
import { LocaleConsumer } from "../context/LocaleContext";

function NoteList({ notes, onDelete, onArchive, onRestore }) {
    const handleArchive = (id) => {
       
        if (onArchive) {
            onArchive(id);
        }
      
        archiveNote(id);
    };

    const handleRestore = (id) => {
      
        if (onRestore) {
            onRestore(id);
        }
        
        unarchiveNote(id);
    };

    return (
        <LocaleConsumer>
            {({ locale }) => (
                <div className="notes-list">
                    {notes.length === 0 ? (
                        <p className="notes-list__empty-message">
                            {locale === "id" ? "Catatan Kosong" : "Empty Notes"}
                        </p>
                    ) : (
                        notes.map((note) => (
                            <NoteItem
                                key={note.id}
                                id={note.id}
                                onDelete={onDelete}
                                onArchive={handleArchive}
                                onRestore={handleRestore}
                                {...note}
                            />
                        ))
                    )}
                </div>
            )}
        </LocaleConsumer>
    );
}

NoteList.propTypes = {
    notes: propTypes.arrayOf(propTypes.object).isRequired,
    onDelete: propTypes.func.isRequired,
    onArchive: propTypes.func, 
    onRestore: propTypes.func, 
};

export default NoteList;
