/* eslint-disable @typescript-eslint/ban-types */
import {type NoteType, type PositionType} from '@store/notesSlice';

export enum NoteAction {
	create,
	update,
}

export const composeCreateNotePayload = (position: PositionType) => JSON.stringify({
	action: NoteAction.create,
	payload: position,
});

export const composeUpdateNotePayload = (note: NoteType) => JSON.stringify({
	action: NoteAction.update,
	payload: note,
});

export const getIsEditableElemActive = (): boolean => (document.activeElement as HTMLElement)?.contentEditable === 'true';

export const getIsElemActive = (el: HTMLElement | null): boolean | undefined => document.activeElement?.contains(el);

export const setEditableDivCaret = (el: HTMLDivElement | null) => {
	if (!el?.childNodes[0]) {
		return;
	}

	const range = document.createRange();
	const selection = window.getSelection();

	range.setStart(el.childNodes[0], el.childNodes[0]?.nodeValue?.length ?? 0);
	range.collapse(true);
	selection?.removeAllRanges();
	selection?.addRange(range);
};
