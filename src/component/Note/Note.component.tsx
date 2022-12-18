import {memo, type RefObject, type FC} from 'react';
import DragAndDrop from '@component/DragAndDrop';
import {type UpdatePositionCbType} from '@component/DragAndDrop/DragAndDrop.component';
import {type PropsType as ContainerPropsType} from './Note.container';

import './Note.scss';

export type PropsType = {
	updateNotePosition: UpdatePositionCbType;
	noteRef: RefObject<HTMLDivElement>;
	openNoteEditPopup: () => void;
} & ContainerPropsType;

export const NoteComponent: FC<PropsType> = ({
	user,
	noteText,
	position,
	updateNotePosition,
	openNoteEditPopup,
	movingPosition,
	noteRef,
}) => (
	<DragAndDrop
		prevPosition={position}
		movingPosition={movingPosition}
		updatePositionCb={updateNotePosition}
	>
		<div
			className='Note'
			onDoubleClick={openNoteEditPopup}
			ref={noteRef}
		>
			<h3 className='Note-Header'>{user}</h3>
			<p className='Note-Text'>{noteText}</p>
		</div>
	</DragAndDrop>
);

export default memo(NoteComponent);
