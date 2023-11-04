var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import io from 'socket.io-client';
const socket = io('https://twine-rt.com', {
    withCredentials: true,
    transports: ['websocket'],
});
function setupSocketListeners() {
    socket.on('connect', () => __awaiter(this, void 0, void 0, function* () {
        console.log('Connected to the Twine server');
    }));
    socket.on("message", (data) => {
        console.log('data from client: ', data);
        console.log('room id from client: ', data.room);
        socket.emit("updateSessionTS", (data.timestamp));
        const messages = document.getElementById('messages');
        const item = document.createElement('li');
        item.textContent = data.message;
        if (messages) {
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
    socket.on('roomJoined', (msg) => {
        console.log(msg);
    });
    const disconnectBtn = document.getElementById('disconnect');
    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            socket.disconnect();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                socket.connect();
            }), 7000);
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const options = document.getElementById('options');
        if (options) {
            options.addEventListener('change', () => {
                const selectedOption = options.value;
                socket.emit('join', `${selectedOption}`);
                console.log('Joined room ', selectedOption);
            });
        }
    });
}
export { setupSocketListeners };
//# sourceMappingURL=socket.js.map