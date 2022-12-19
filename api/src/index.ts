import express, { Request, Response } from "express";
import WsServer, { Application, Instance } from "express-ws";
import WebSocket, { MessageEvent } from "ws";
import jwt from "jsonwebtoken";
import cors from "cors";
import url from "url";

import { createNote, getUpdatedNotes, NoteAction } from "./util/ws";

import { composeCustomer, generateWebToken, jwsSecret } from "./actions/login";
import type { Customer, NoteType } from "./types";

const customers: Array<Customer> = [];
let notes: Array<NoteType> = [];

const expressWs: Instance = WsServer(express());
const server: Application = expressWs.app;

server.use(express.json());
server.use(
	cors({origin: ["http://localhost:3000"]})
);

const port = 3001;

function getBearerToken(req: Request): string {
    const {headers: {authorization}} = req;

    if (!authorization?.includes('Bearer ')) {
        return '';
    }

    return authorization?.split(' ')[1];
}

function sendToAllClients(ws: WebSocket, message: string) {
    expressWs.getWss().clients.forEach((client) => {
        if (client === ws || client.readyState !== WebSocket.OPEN) {
            return;
        }

        client.send(message);
    });
}

server.ws("/api/notes", (ws: WebSocket, req: Request) => {
	ws.send(JSON.stringify(notes));
    const token = url.parse(req.url, true).query.token as string;

    let user = '';

    if (typeof token !== 'string') {
        ws.close();
    }

    jwt.verify(token, jwsSecret, (err, decoded) => {
        if (err) {
            ws.close();
            return;
        }

        user = (decoded as {username: string}).username;
    });

	ws.addEventListener("message", (
        e: MessageEvent,
    ) => {
        const data = JSON.parse(e.data.toString());
        switch(data.action) {
            case NoteAction.create:
                createNote(data.position, ws, user, notes);
                sendToAllClients(ws, JSON.stringify(notes));
                break;
            case NoteAction.update:
                const updatedNotes: NoteType[] = getUpdatedNotes(data.note, notes);
                notes = updatedNotes;
                sendToAllClients(ws, JSON.stringify(notes));
                break;
            default:
                return;
    }});
});

server.post("/api/login", (req: Request, res: Response) => {
	const { username } = req.body;
	const token = generateWebToken(username);

	if (!token) {
		res.status(400).send("Wrong data.");
	}

	const customer: Customer = composeCustomer(username, token, customers);
	customers.push(customer);

	res.status(200).send(customer);
});

server.get("/api/user", (req: Request, res: Response) => {
    const token = getBearerToken(req);

	if (!token) {
		res.status(200).send(false);
        return;
	}

    jwt.verify(token, jwsSecret, (err, decoded) => {
        if (err) {
            res.status(200).send(false);
            return;
        }

        const user = (decoded as {username: string}).username;
        const customer = customers.filter(({username}) => username === user)[0];

        res.status(200).send(customer);
    });
});

server.listen(port, () => {
	console.log(`API is running on ${port}`);
});
