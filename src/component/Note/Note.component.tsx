import React, {memo, type RefObject, type FC} from 'react';
import DragAndDrop from '@component/DragAndDrop';
import {type UpdatePositionCbType} from '@component/DragAndDrop/DragAndDrop.component';
import {type PropsType as ContainerPropsType} from './Note.container';

import './Note.scss';
import ClickOutside from '@component/ClickOutside';
import {getIsEditableElemActive, getIsElemActive} from '@util/Notes';

export type PropsType = {
	updateNotePosition: UpdatePositionCbType;
	onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	onEditorMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	onEditorMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClickOutside: (e: MouseEvent) => void;
	noteRef: RefObject<HTMLDivElement>;
	noteEditorRef: RefObject<HTMLDivElement>;
} & ContainerPropsType;

export const NoteComponent: FC<PropsType> = ({
	note: {user, position},
	onKeyDown,
	updateNotePosition,
	onClickOutside,
	onEditorMouseDown,
	onEditorMouseUp,
	movingPosition,
	noteRef,
	noteEditorRef,
	ownerUser,
}) => {
	const isOwner = user === ownerUser;

	return (
		<DragAndDrop
			prevPosition={position}
			movingPosition={movingPosition}
			updatePositionCb={updateNotePosition}
			isOwner={isOwner}
			isDraggable={
				!getIsEditableElemActive()
                && !getIsElemActive(noteEditorRef.current)
			}
		>
			<ClickOutside onClick={onClickOutside}>
				{/* additional <div> wrapper for refs attached to props.children by ClickOutside */}
				<div>
					<div
						className='Note'
						ref={noteRef}
					>
						<h3 className='Note-Header'>{user}</h3>
						<div
							tabIndex={-1}
							ref={noteEditorRef}
							onMouseDown={onEditorMouseDown}
							onMouseUp={onEditorMouseUp}
							contentEditable={true}
							onKeyDown={onKeyDown}
							className='Note-Text'
						/>
					</div>
				</div>
			</ClickOutside>
		</DragAndDrop>
	);
};

export default memo(NoteComponent);
