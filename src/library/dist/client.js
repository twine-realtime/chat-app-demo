var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { io } from 'socket.io-client';
export class Twine {
    constructor(host) {
        fetch(`${host}/set-cookie`, { credentials: 'include' });
        this.socket = io(host, {
            withCredentials: true,
            transports: ['websocket'],
        });
        this.socket.on('connect', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Connected to the Twine server');
            yield this.socket.emit('stateRecovery');
        }));
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
    listenOn(roomName, callback) {
        // console.log("roomName:", roomName);
        this.socket.on("message", (payload) => {
            console.log("payload:", payload);
            if (payload.room === roomName) {
                callback(payload);
            }
        });
    }
    ;
}
// const twineConnection = new Twine('http://localhost:3001');
// twineConnection.disconnect();
// twineConnection.connect();
// twineConnection.subscribe(['A', 'B']);
// twineConnection.unsubscribe(['B']);
// twineConnection.listenFor('message', (payload) => {
// 	console.log(payload);
// })
