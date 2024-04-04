import React from "react";
import { LocaleConsumer } from "../context/LocaleContext";

function NoteHeader({name}) {
    return (
        <LocaleConsumer >{({
            locale
        }) => {
            return (
            <div className="note-app__header">
            <h1>{locale === 'id' ? `Catatan oleh ${name}` : `Notes By ${name}`}</h1>
            </div>
            );
        }
        }
        </LocaleConsumer>
    );
}

export default NoteHeader;