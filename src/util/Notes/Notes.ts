import {type NoteType, type PositionType} from '@store/notesSlice';

export enum NoteAction {
	create,
	update,
}

export const composeCreateNotePayload = (position: PositionType) => JSON.stringify({
	action: NoteAction.create,
	position,
});

export const composeUpdateNotePayload = (note: NoteType) => JSON.stringify({
	action: NoteAction.update,
	note,
});
