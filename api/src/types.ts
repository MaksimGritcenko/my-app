import {type NoteAction} from 'util/ws';

export type Customer = {
	id: number;
	username: string;
	token: string;
};

export type PositionType = {
	x: number;
	y: number;
};

export type NoteType = {
	id: number;
	user: string;
	noteText: string;
	position: PositionType;
	colorRgb: string;
};

export type Coordinates = {
	x: number;
	y: number;
};

export type WsUpdatePayload = {
	action: NoteAction.update;
	payload: NoteType;
};

export type WsCreatePayloadType = {
	action: NoteAction.create;
	payload: PositionType;
};
