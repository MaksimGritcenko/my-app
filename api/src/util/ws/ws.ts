import { NoteType, PositionType } from "types";
import { generateEntryId } from "../entry";
import { generateRandomRgbStyle } from "../notes";
import { WebSocket } from "ws";

export enum NoteAction {
	create,
	update,
}

export const createNote = (
    position: PositionType,
    ws: WebSocket,
    user: string,
    notes: NoteType[]
) => {
    const note = {
        id: generateEntryId(notes),
        noteText: '',
        user,
        position: position,
        colorRgb: generateRandomRgbStyle()
    };

    notes.push(note);
    ws.send(JSON.stringify(notes));
}

export const getUpdatedNotes = (
    currentNote: NoteType,
    notes: NoteType[]
): NoteType[] => {
    return notes.map((note: NoteType) => {
        const {id} = currentNote;

        if (id === note.id) {
            return currentNote;
        }

        return note;
    });
};
