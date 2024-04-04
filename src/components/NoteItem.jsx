import React from "react";
import NoteItemContainer from "./NoteItemContainer";
import DeleteButton from "./DeleteButton";
import propTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";


function NoteItem ({title, body, createdAt, id, onDelete, onArchive, onRestore, archived}) {
    return (
        <LocaleConsumer>
            {({locale}) => (
                 <div className="note-item">
                 <div className="note-item__content">
                     <NoteItemContainer id={id} title={title} createdAt={createdAt} body = {body}/>
     
                 </div>
     
                 <div className="note-item__action">
                     <DeleteButton id={id} onDelete={onDelete}/>
                     {archived ?
                         <button className="note-item__restore-button" onClick={() => onRestore(id)}>{locale === 'id'?'Pulihkan' : 'Restore'}</button> :
                         <button className="note-item__archive-button" onClick={() => onArchive(id)}>{locale === 'id'?'Arsip': 'Archive'}</button>
                     }
                 </div>
             </div>
            )}
        </LocaleConsumer>
    );

}

NoteItem.propTypes = {
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    onDelete: propTypes.func.isRequired,
    onArchive: propTypes.func.isRequired,
    onRestore: propTypes.func.isRequired,
    archived: propTypes.bool.isRequired

}

export default NoteItem;