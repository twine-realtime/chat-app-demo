import { io } from "./socket.io.esm.min.js";

export class TwineClientLibrary {
	constructor(host) {
		this.socket;
		this.initializeTwine(host);
	}

	async initializeTwine(host) {
		await fetch(`${host}/set-cookie`, { credentials: 'include' });
		
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

	subscribe(roomsToJoin) {
		this.socket.emit('subscribe', roomsToJoin);
    this.socket.on("roomJoined", (msg) => console.log(msg))
	}

	unsubscribe(roomsToLeave) {
		this.socket.emit('unsubscribe', roomsToLeave);
    this.socket.on("roomLeft", (msg) => console.log(msg))
	}

  async listenOn(roomName, callback) {
		const id = setInterval(() => {
			if (this.socket) {
				this.socket.on("message", (payload) => {
					if (payload.room === roomName) {
						callback(payload);
						this.socket.emit("updateSessionTS", (payload.timestamp));
					}
				});
				clearInterval(id);	
			}
		}, 100)
	};
}