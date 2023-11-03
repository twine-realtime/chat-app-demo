import { io, Socket } from 'socket.io-client';

// const DEPLOYED_HOST = '44.212.23.240:3001';
// const LOCALHOST = 'http://localhost:3001';

type CallbackFunction = (...args: any[]) => void;

export class Twine {
	socket: Socket;

	constructor(host: string) { // https://twine-rt.com
		fetch(`${host}/set-cookie`, { credentials: 'include' })

		this.socket = io(host, { 
			withCredentials: true,
			transports: ['websocket'],
		});

		this.socket.on('connect', async () => {
			console.log('Connected to the Twine server');
			await this.socket.emit('stateRecovery');
		});
	}

	connect() {
		this.socket.connect();
	}

	disconnect() {
		this.socket.disconnect();
	}

	subscribe(roomsToJoin: string[]) {
		this.socket.emit('join', roomsToJoin);
		// should change the listener on the server to `subscribe`
		// should accept an array of strings instead of a single string
	}

	unsubscribe(roomsToLeave: string[]) {
		this.socket.emit('leave', roomsToLeave);
		// need to create a listener on the server to ctach this event and unsubscribe
		// param should be an array of strings
	}

	listenOn(roomName: string, callback: any) {
		// console.log("roomName:", roomName);
		this.socket.on("message", (payload) => {
			console.log("payload:", payload);
			if (payload.room === roomName) {
				callback(payload);
			}
		});
	};
}

// const twineConnection = new Twine('http://localhost:3001');

// twineConnection.disconnect();
// twineConnection.connect();
// twineConnection.subscribe(['A', 'B']);
// twineConnection.unsubscribe(['B']);

// twineConnection.listenFor('message', (payload) => {
// 	console.log(payload);
// })