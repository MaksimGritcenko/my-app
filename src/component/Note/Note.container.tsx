import {memo, useRef, useEffect, type FC} from 'react';
import {useDispatch} from 'react-redux';
import {type PositionType, type NoteType, setNewNotePosition} from '@store/notesSlice';
import {type AppDispatch} from '@store/index';

import NoteComponent from './Note.component';
import {type WebSocketType} from '@component/Board/Board.container';
import {composeUpdateNotePayload} from '@util/Notes';
import {setActivePopup} from '@store/popupSlice';
import {NOTE_EDIT_POPUP_ID} from '@component/NoteEditPopup/NoteEditPopup.config';

export type PropsType = NoteType & {
	ws: WebSocketType;
	movingPosition: PositionType;
};

export const NoteContainer: FC<PropsType> = props => {
	const noteRef = useRef<HTMLDivElement>(null);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const {colorRgb} = props;
		noteRef.current?.style.setProperty('--note-color', colorRgb);
	}, []);

	function openNoteEditPopup() {
		dispatch(setActivePopup(NOTE_EDIT_POPUP_ID));
	}

	function updateNotePosition(nextPosition: PositionType) {
		const {ws, ...note} = props;

		if (!ws) {
			return;
		}

		dispatch(setNewNotePosition({noteId: note.id, position: nextPosition}));

		ws.send(composeUpdateNotePayload({
			...note,
			position: nextPosition,
		}));
	}

	return <NoteComponent
		{...props}
		noteRef={noteRef}
		updateNotePosition={updateNotePosition}
		openNoteEditPopup={openNoteEditPopup}
	/>;
};

export default memo(NoteContainer);
