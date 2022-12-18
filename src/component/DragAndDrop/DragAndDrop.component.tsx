
import React, {
	memo,
	useRef,
	useState,
	useEffect,
	type FC,
	type ReactElement,
} from 'react';
import {type PositionType} from '@store/notesSlice';
import {getPositionInPercent} from '@util/dnd';

import './DragAndDrop.scss';

export type UpdatePositionCbType = (nextPosition: PositionType) => void;

export type PropsType = {
	children: ReactElement;
	prevPosition: PositionType;
	updatePositionCb: UpdatePositionCbType;
	movingPosition: PositionType;
};

export const DragAndDrop: FC<PropsType> = ({
	children,
	prevPosition,
	movingPosition,
	updatePositionCb,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [initialPosition, setInitialPosition] = useState(prevPosition);
	const [position, setPosition] = useState(prevPosition);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		setRefPosition(position);
	}, [position]);

	useEffect(() => {
		setRefPosition(prevPosition);
	}, [prevPosition]);

	useEffect(() => {
		if (!isDragging) {
			return;
		}

		const {x: clientX, y: clientY} = getPositionInPercent({x: movingPosition.x, y: movingPosition.y});
		const {x, y} = getPositionInPercent(initialPosition);
		const {x: prevX, y: prevY} = prevPosition;

		const nextX = clientX - x + prevX;
		const nextY = clientY - y + prevY;

		handleSetPosition(nextX, nextY);
	}, [movingPosition]);

	function setRefPosition({x, y}: PositionType) {
		if (!ref.current) {
			return;
		}

		ref.current.style.setProperty('--dnd-x', `${x}%`);
		ref.current.style.setProperty('--dnd-y', `${y}%`);
	}

	function handleSetInitialPosition(x: number, y: number) {
		setInitialPosition({x, y});
	}

	function handleSetPosition(x: number, y: number) {
		setPosition({x, y});
	}

	function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		const {clientX, clientY} = e;

		e.preventDefault();
		e.stopPropagation();

		setIsDragging(true);
		handleSetInitialPosition(clientX, clientY);
	}

	function dropElement(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();

		setIsDragging(false);
		updatePositionCb(position);
	}

	return (
		<div
			className={isDragging ? 'DragAndDrop DragAndDrop_isDragging' : 'DragAndDrop'}
			draggable
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={dropElement}
		>
			{children}
		</div>
	);
};

export default memo(DragAndDrop);
