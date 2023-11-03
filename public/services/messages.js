import { Twine } from './library/dist/client.js'

console.log(Twine)

const host = 'https://twine-rt.com'
const twine = new Twine(host)

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

twine.listenOn("A", (data) => {
  logMessageInfo(data);
  addMessageToDOM(data);
});

twine.listenOn("B", (data) => {
  logMessageInfo(data);
  addMessageToDOM(data);
});

twine.listenOn("C", (data) => {
  logMessageInfo(data);
  addMessageToDOM(data);
});

twine.listenOn("D", (data) => {
  logMessageInfo(data);
  addMessageToDOM(data);
});

const disconnectBtn = document.getElementById('disconnect');
disconnectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  twine.disconnect();
  setTimeout(() => {
    twine.connect();
  }, 10000)
});

// fires event when a room is selected from the dropdown
document.addEventListener('DOMContentLoaded', () => {
  const options = document.getElementById('options');

  options.addEventListener('change', () => {
    const selectedOption = options.value;
    // join room <button value> on change event
    // server then emits back to roomJoined (below)
    twine.subscribe(selectedOption);
  });
});

// fetch('https://twine-rt.com/set-cookie', { credentials: 'include' })

// const socket = io('https://twine-rt.com', { 
//   withCredentials: true,
//   transports: ['websocket', 'polling'],
// });

// socket.on('connect', () => {
//   console.log('Connected to the Twine server');
// });

// socket.on("message", (data) => {
//   console.log('data from client: ', data);
//   console.log('room id from client: ', data.room);
//   socket.emit("updateSessionTS", (data.timestamp));
//   const messages = document.getElementById('messages');
//   const item = document.createElement('li');
//   item.textContent = data.message;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

// socket.on('roomJoined', (msg) => {
//   console.log(msg);
// });

// const disconnectBtn = document.getElementById('disconnect');
// disconnectBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   socket.disconnect();
//   setTimeout(() => {
//     socket.connect();
//   }, 10000)
// });

// // fires event when a room is selected from the dropdown
// document.addEventListener('DOMContentLoaded', () => {
//   const options = document.getElementById('options');

//   options.addEventListener('change', () => {
//     const selectedOption = options.value;
//     // join room <button value> on change event
//     // server then emits back to roomJoined (below)
//     socket.emit('join', `${selectedOption}`);
//   });
// });