await fetch('https://twine-rt.com/set-cookie', { credentials: 'include' })

const socket = io('https://twine-rt.com', { 
  withCredentials: true,
  transports: ['websocket'],
});

const messages = document.getElementById('messages');

socket.on('connect', async () => {
  console.log('Connected to twine server');
  await socket.emit('stateRecovery');
});

const logMessageInfo = (data) => {
  console.log('data from client: ', data);
  console.log('room id from client: ', data.room);
  socket.emit("updateSessionTS", (data.timestamp));
}

const addMessageToDOM = (data) => {
  const item = document.createElement('li');
  item.textContent = data.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

const listenOn = (socket, roomName, callback) => {
  console.log("roomName:", roomName);
  socket.on("message", (payload) => {
    console.log("payload:", payload);
    if (payload.room === roomName) {
      callback(payload);
    }
  });
};

// socket.on("message", (data) => {
//   logMessageInfo(data);
//   addMessageToDOM(data);
// });

listenOn(socket, "A", (payload) => {
  logMessageInfo(payload);
  addMessageToDOM(payload);
})

listenOn(socket, "B", (payload) => {
  logMessageInfo(payload);
  addMessageToDOM(payload);
})

listenOn(socket, "C", (payload) => {
  logMessageInfo(payload);
  addMessageToDOM(payload);
})

listenOn(socket, "D", (payload) => {
  logMessageInfo(payload);
  addMessageToDOM(payload);
})

socket.on('roomJoined', (msg) => {
  console.log(msg);
});

if (document.readyState === 'complete') {
  // The document is still loading, we can add the event listener normally.
  console.log('COMPLETE');
} 

const disconnectBtn = document.getElementById('disconnect');
disconnectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socket.disconnect();
  setTimeout(() => {
    socket.connect();
  }, 3000)
});

// fires event when a room is selected from the dropdown
const options = document.getElementById('options');

options.addEventListener('change', () => {
  const selectedOption = options.value;
  // join room <button value> on change event
  // server then emits back to roomJoined (below)
  socket.emit('join', `${selectedOption}`);
  console.log('JOINED ROOM');
});
