import {memo, useRef, useEffect, useState, type FC} from 'react';
import {useDispatch} from 'react-redux';
import {type PositionType, type NoteType, setNewNotePosition} from '@store/notesSlice';
import {type AppDispatch} from '@store/index';

import NoteComponent from './Note.component';
import {type WebSocketType} from '@component/Board/Board.container';
import {composeUpdateNotePayload, getIsEditableElemActive, setEditableDivCaret} from '@util/Notes';
import {ESCAPE_CODE} from '@component/Popup/Popup.config';
import {ENTER_KEY} from './Note.config';

export type PropsType = {
	note: NoteType;
	ws: WebSocketType;
	movingPosition: PositionType;
	ownerUser: string;
};

export const NoteContainer: FC<PropsType> = props => {
	const [beforePosition, setBeforePosition] = useState<PositionType>({x: 0, y: 0});
	const noteRef = useRef<HTMLDivElement>(null);
	const noteEditorRef = useRef<HTMLDivElement>(null);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const {note: {colorRgb}} = props;
		noteRef.current?.style.setProperty('--note-color', colorRgb);
	}, [noteRef]);

	useEffect(() => {
		const {note: {noteText}} = props;

		if (!noteEditorRef.current) {
			return;
		}

		noteEditorRef.current.innerHTML = noteText;
	}, []);

	function updateNotePosition(nextPosition: PositionType) {
		const {ws, note} = props;

		if (
			!ws
            || JSON.stringify(note.position) === JSON.stringify(nextPosition)
		) {
			return;
		}

		dispatch(setNewNotePosition({noteId: note.id, position: nextPosition}));
		updateNote({
			...note,
			position: nextPosition,
		});
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		const {note} = props;
		const {ctrlKey, key} = e;

		setTimeout(afterRender);

		function afterRender(): void {
			const {innerText} = e.target as HTMLDivElement;

			if (
				key !== ESCAPE_CODE
                    && !(ctrlKey && key === ENTER_KEY)
			) {
				return;
			}

			noteEditorRef.current?.blur();

			if (innerText === note.noteText) {
				return;
			}

			updateNote({
				...note,
				noteText: innerText,
			});
		}
	}

	const onEditorMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setBeforePosition({x: e.clientX, y: e.clientY});
	};

	function onClickOutside() {
		const {note} = props;

		const nextEditorText = noteEditorRef.current?.innerText;

		if (
			typeof nextEditorText !== 'string'
            || nextEditorText === note.noteText
		) {
			return;
		}

		updateNote({
			...note,
			noteText: nextEditorText,
		});
	}

	function updateNote(note: NoteType) {
		const {ws} = props;
		ws?.send(composeUpdateNotePayload(note));
	}

	function onEditorMouseUp(e: React.MouseEvent<HTMLDivElement>) {
		const {clientX, clientY} = e;
		const {x, y} = beforePosition;

		const isNoteEditorActive = getIsEditableElemActive();

		e.preventDefault();

		if (clientX !== x || clientY !== y) {
			return;
		}

		noteEditorRef.current?.focus();

		if (!isNoteEditorActive) {
			setEditableDivCaret(noteEditorRef.current);
		}
	}

	return <NoteComponent
		{...props}
		noteRef={noteRef}
		noteEditorRef={noteEditorRef}
		onKeyDown={onKeyDown}
		onClickOutside={onClickOutside}
		updateNotePosition={updateNotePosition}
		onEditorMouseDown={onEditorMouseDown}
		onEditorMouseUp={onEditorMouseUp}
	/>;
};

export default memo(NoteContainer);
