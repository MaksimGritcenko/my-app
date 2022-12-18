import {memo, type FC, type MouseEvent, useState, useEffect, useRef} from 'react';
import {compose} from 'redux';
import {connect, useDispatch} from 'react-redux';
import {type RootState, type AppDispatch} from '@store/index';
import {type PositionType} from '@store/notesSlice';
import {getPositionInPercent} from '@util/dnd';
import {getToken} from '@util/Request';
import {setNotes} from '@store/notesSlice';

import BoardComponent from './Board.component';
import {composeCreateNotePayload} from '@util/Notes';

export const mapStateToProps = (state: RootState) => ({
	notes: state.notesReducer.notes,
	user: state.userReducer.user,
});

export type MstpType = ReturnType<typeof mapStateToProps>;
export type WebSocketType = WebSocket | undefined;

export const BoardContainer: FC<MstpType> = props => {
	const boardRef = useRef<HTMLElement>(null);

	const [ws, setWs] = useState<WebSocketType>();
	const [initialPosition, setInitialPosition] = useState<PositionType>({x: 0, y: 0});
	const [movingPosition, setMovingPosition] = useState<PositionType>({x: 0, y: 0});
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		let wsUrl = 'ws://localhost:3001/api/notes';

		if (getToken()) {
			wsUrl += `?token=${getToken(false)}`;
		}

		const ws = new WebSocket(wsUrl);
		setWs(ws);

		ws.onmessage = ({data}) => {
			dispatch(setNotes(JSON.parse(data)));
		};
	}, [props.user]);

	function onBoardMouseDown({clientX: x, clientY: y}: MouseEvent<HTMLElement>) {
		setInitialPosition({x, y});
	}

	function onBoardMouseMove({clientX: x, clientY: y}: MouseEvent<HTMLElement>) {
		setMovingPosition({x, y});
	}

	function onBoardMouseUp({clientX: x, clientY: y, target}: MouseEvent<HTMLElement>) {
		const {x: initialX, y: initialY} = initialPosition;

		if (
			!(target as Node).contains(boardRef.current)
			|| !ws
            || (initialX !== x && initialY !== y)
		) {
			return;
		}

		const position: PositionType = getPositionInPercent({x, y});
		ws.send(composeCreateNotePayload(position));
	}

	return <BoardComponent
		{...props}
		onMouseDown={onBoardMouseDown}
		onMouseMove={onBoardMouseMove}
		onMouseUp={onBoardMouseUp}
		boardRef={boardRef}
		movingPosition={movingPosition}
		ws={ws}
	/>;
};

export default compose<FC>(
	memo,
	connect(mapStateToProps),
)(BoardContainer);
