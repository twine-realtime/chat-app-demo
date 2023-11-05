// import io from 'socket.io-client';

/*
This code was working.
Cleared cookies and it seemed to break.
Put the old code back into use and it was still broken. 
It's raising a CORS error about the /set-cookie request
*/

export class Twine {
	constructor(host) { // https://twine-rt.com
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
		this.socket.emit('join', roomsToJoin);
		// should change the listener on the server to `subscribe`
		// should accept an array of strings instead of a single string
	}

	unsubscribe(roomsToLeave) {
		this.socket.emit('leave', roomsToLeave);
		// need to create a listener on the server to ctach this event and unsubscribe
		// param should be an array of strings
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