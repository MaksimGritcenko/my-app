import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type PositionType = {
	x: number;
	y: number;
};

export type NoteType = {
	id: number;
	user: string;
	noteText: string;
	position: PositionType;
	colorRgb: string;
};

export const initialState = {
	notes: [] as NoteType[],
};

export const notesSlice = createSlice({
	name: 'notesReducer',
	initialState,
	reducers: {
		setNotes(state, action: PayloadAction<NoteType[]>) {
			state.notes = action.payload;
		},
		setNewNotePosition(state, {payload: {noteId, position}}: PayloadAction<{noteId: number; position: PositionType}>) {
			state.notes = state.notes.map(note => {
				const {id} = note;

				if (id !== noteId) {
					return note;
				}

				return {
					...note,
					position,
				};
			});
		},
	},
});

export const {setNotes, setNewNotePosition} = notesSlice.actions;

export default notesSlice.reducer;
