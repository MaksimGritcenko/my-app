import {memo, type RefObject, type FC, type MouseEvent} from 'react';
import {type PositionType} from '@store/notesSlice';
import Note from '@component/Note';

import {type WebSocketType, type MstpType as ContainerPropsType} from './Board.container';

import './Board.scss';

export type PropsType = ContainerPropsType & {
	onMouseDown: (e: MouseEvent<HTMLElement>) => void;
	onMouseUp: (e: MouseEvent<HTMLElement>) => void;
	onMouseMove: (e: MouseEvent<HTMLElement>) => void;
	movingPosition: PositionType;
	ws: WebSocketType;
	boardRef: RefObject<HTMLElement>;
};

export const BoardComponent: FC<PropsType> = ({
	boardRef,
	notes,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	movingPosition,
	ws,
	user,
}) => {
	function renderNotes(notes: PropsType['notes'], ws: WebSocketType) {
		return notes.map((note, i) => <Note
			key={`${note.user}_${i}`}
			note={note}
			movingPosition={movingPosition}
			ownerUser={user?.username ?? ''}
			ws={ws}
		/>);
	}

	return (
		<main
			ref={boardRef}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			className='Board'
		>
			{renderNotes(notes, ws)}
		</main>
	);
};

export default memo(BoardComponent);
