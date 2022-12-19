
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
import {getIsEditableElemActive} from '@util/Notes';
import {composeClassName} from '@util/class';

import './DragAndDrop.scss';

export type UpdatePositionCbType = (nextPosition: PositionType) => void;

export type PropsType = {
	children: ReactElement;
	prevPosition: PositionType;
	updatePositionCb: UpdatePositionCbType;
	movingPosition: PositionType;
	isOwner?: boolean;
	isDraggable?: boolean;
	mix: string;
};

export const DragAndDrop: FC<PropsType> = ({
	children,
	prevPosition,
	movingPosition,
	updatePositionCb,
	isOwner = true,
	isDraggable = true,
	mix = '',
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [initialPosition, setInitialPosition] = useState(prevPosition);
	const [position, setPosition] = useState(prevPosition);
	const [isDragging, setIsDragging] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		setRefPosition(position);
	}, [position]);

	useEffect(() => {
		setRefPosition(prevPosition);
	}, [prevPosition]);

	/* initialize dragging */
	useEffect(() => {
		const {x: clientX, y: clientY} = movingPosition;
		const {x, y} = initialPosition;

		if (
			!isClicked
            || isDragging
            || (x === clientX && y === clientY)
		) {
			return;
		}

		setIsDragging(true);
	}, [movingPosition]);

	useEffect(() => {
		if (!isDragging || !isOwner) {
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
		const isNoteEditorActive = getIsEditableElemActive();

		if (!isOwner) {
			e.preventDefault();
		}

		if (
			!isOwner
            || isDraggable
            || isNoteEditorActive
		) {
			return;
		}

		e.preventDefault();

		/* blurring currently active element before dragging start */
		if (
			document.activeElement
            && document.activeElement !== document.body
            && document.activeElement instanceof HTMLElement
		) {
			document.activeElement.blur();
		}

		setIsClicked(true);
		handleSetInitialPosition(clientX, clientY);
	}

	function dropElement(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();

		if (!isOwner) {
			return;
		}

		setIsClicked(false);
		setIsDragging(false);
		updatePositionCb(position);
	}

	return (
		<div
			className={
				`${composeClassName('DragAndDrop', undefined, {isDragging})} ${mix}`
			}
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={dropElement}
		>
			{children}
		</div>
	);
};

export default memo(DragAndDrop);
