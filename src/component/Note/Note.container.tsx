import {memo, useRef, useEffect, useState, type FC} from 'react';
import {compose} from 'redux';
import {useDispatch, connect} from 'react-redux';
import {type PositionType, type NoteType, setNewNotePosition} from '@store/notesSlice';
import {type RootState, type AppDispatch} from '@store/index';

import NoteComponent from './Note.component';
import {type WebSocketType} from '@component/Board/Board.container';
import {composeUpdateNotePayload, getIsEditableElemActive, setEditableDivCaret} from '@util/Notes';
import {ESCAPE_CODE} from '@component/Popup/Popup.config';
import {ENTER_KEY} from './Note.config';

export const mapStateToProps = (state: RootState) => ({
	user: state.userReducer.user,
});

export type SelfType = {
	note: NoteType;
	ws: WebSocketType;
	movingPosition: PositionType;
	ownerUser: string;
};
export type MstpType = ReturnType<typeof mapStateToProps>;
export type PropsType = MstpType & SelfType;

export const NoteContainer: FC<PropsType> = props => {
	const [beforePosition, setBeforePosition] = useState<PositionType>({x: 0, y: 0});
	const [isHovering, setIsHovering] = useState<boolean>(false);
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
		const {ws, note, user} = props;

		if (
			!ws
            || JSON.stringify(note.position) === JSON.stringify(nextPosition)
            || user?.username !== note.user
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

	function onNoteClick() {
		setIsHovering(true);
	}

	function onClickOutside() {
		const {note, user} = props;
		const nextEditorText = noteEditorRef.current?.innerText;

		setIsHovering(false);

		if (
			typeof nextEditorText !== 'string'
            || nextEditorText === note.noteText
            || user?.username !== note.user
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
		const {note, user} = props;
		const {clientX, clientY} = e;
		const {x, y} = beforePosition;

		const isNoteEditorActive = getIsEditableElemActive();

		e.preventDefault();

		if (
			clientX !== x
            || clientY !== y
            || user?.username !== note.user
		) {
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
		isHovering={isHovering}
		onKeyDown={onKeyDown}
		onNoteClick={onNoteClick}
		onClickOutside={onClickOutside}
		updateNotePosition={updateNotePosition}
		onEditorMouseDown={onEditorMouseDown}
		onEditorMouseUp={onEditorMouseUp}
	/>;
};

export default compose<FC<SelfType>>(
	memo,
	connect(mapStateToProps),
)(NoteContainer);
