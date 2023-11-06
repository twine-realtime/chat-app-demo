await fetch('https://twine-rt.com/set-cookie', { credentials: 'include' });

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
  // console.log("roomName:", roomName);
  socket.on("message", (payload) => {
    // console.log("payload:", payload);
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

const disconnectBtn = document.getElementById('disconnect');
disconnectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socket.disconnect();
  setTimeout(async () => {
    socket.connect();
  }, 3000)
});


// document.addEventListener('DOMContentLoaded', () => {
  const options = document.getElementById('options');

  options.addEventListener('change', () => {
    const selectedOption = options.value;
    socket.emit('join', `${selectedOption}`);
  });
// });

//////////// Twine Implementation (not working) ////////////

// await fetch('https://twine-rt.com/set-cookie', { credentials: 'include' })

// import { Twine } from "./twineLibrary.js";
// const twine = new Twine('https://twine-rt.com');

// console.log("line 6", twine);

// const messages = document.getElementById('messages');

// const logMessageInfo = (data) => {
//   console.log('data from client: ', data);
//   console.log('room id from client: ', data.room);
// }

// const addMessageToDOM = (data) => {
//   const item = document.createElement('li');
//   item.textContent = data.message;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// }

// twine.listenOn("A", (payload) => {
//   console.log("line 23", twine);
//   // logMessageInfo(payload);
//   addMessageToDOM(payload);
// })

// twine.listenOn("B", (payload) => {
//   // logMessageInfo(payload);
//   addMessageToDOM(payload);
// })

// twine.listenOn("C", (payload) => {
//   // logMessageInfo(payload);
//   addMessageToDOM(payload);
// })

// twine.listenOn("D", (payload) => {
//   // logMessageInfo(payload);
//   addMessageToDOM(payload);
// })

// twine.listenOn('roomJoined', (msg) => {
//   console.log(msg);
// });

// const disconnectBtn = document.getElementById('disconnect');
// disconnectBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   twine.disconnect();
//   setTimeout(async () => {
//     twine.connect();
//   }, 10000)
// });

// const options = document.getElementById('options');

// options.addEventListener('change', () => {
//   const selectedOption = options.value;
//   twine.subscribe(selectedOption);
// });
