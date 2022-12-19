import {memo, type RefObject, type FC, useEffect} from 'react';
import DragAndDrop from '@component/DragAndDrop';
import {type UpdatePositionCbType} from '@component/DragAndDrop/DragAndDrop.component';
import {type PropsType as ContainerPropsType} from './Note.container';

import './Note.scss';
import ClickOutside from '@component/ClickOutside';
import {getIsEditableElemActive, getIsElemActive} from '@util/Notes';
import {composeClassName} from '@util/class';

export type PropsType = {
	noteRef: RefObject<HTMLDivElement>;
	noteEditorRef: RefObject<HTMLDivElement>;
	updateNotePosition: UpdatePositionCbType;
	isHovering: boolean;
	onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	onEditorMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	onEditorMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
	onNoteClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClickOutside: (e: MouseEvent) => void;
} & ContainerPropsType;

export const NoteComponent: FC<PropsType> = ({
	note: {user, noteText, position},
	isHovering,
	onKeyDown,
	updateNotePosition,
	onNoteClick,
	onClickOutside,
	onEditorMouseDown,
	onEditorMouseUp,
	movingPosition,
	noteRef,
	noteEditorRef,
	ownerUser,
}) => {
	const isOwner = user === ownerUser;
	const isActive = Boolean(getIsElemActive(noteEditorRef.current));

	useEffect(() => {
		const innerText = noteEditorRef.current?.innerText;
		if (typeof innerText === 'string') {
			(noteEditorRef.current as HTMLInputElement).innerText = noteText;
		}
	}, [noteText]);

	return (
		<ClickOutside onClick={onClickOutside}>
			{/* additional <div> wrapper for refs attached to props.children by ClickOutside */}
			<div>
				<DragAndDrop
					prevPosition={position}
					movingPosition={movingPosition}
					updatePositionCb={updateNotePosition}
					isOwner={isOwner}
					mix={composeClassName('Note', 'Dnd', {isActive: isHovering})}
					isDraggable={
						!getIsEditableElemActive()
                && !isActive
					}
				>
					<div
						ref={noteRef}
						className={composeClassName('Note', undefined, {isOwner})}
						onClick={onNoteClick}
					>
						<h3 className={composeClassName('Note', 'Header')}>{user}</h3>
						<div
							className={composeClassName('Note', 'Text', {isOwner})}
							tabIndex={-1}
							ref={noteEditorRef}
							onMouseDown={onEditorMouseDown}
							onMouseUp={onEditorMouseUp}
							contentEditable={true}
							onKeyDown={onKeyDown}
						/>
					</div>
				</DragAndDrop>
			</div>
		</ClickOutside>
	);
};

export default memo(NoteComponent);
