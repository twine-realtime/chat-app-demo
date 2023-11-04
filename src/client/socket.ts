import io from 'socket.io-client';

const socket = io('https://twine-rt.com', { 
  withCredentials: true,
  transports: ['websocket'],
});

function setupSocketListeners() {
  socket.on('connect', async () => {
    console.log('Connected to the Twine server');
  });

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
      setTimeout(async () => {
        socket.connect();
      }, 7000)
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const options = document.getElementById('options');
  
    if (options) {
      options.addEventListener('change', () => {
        const selectedOption = (options as HTMLSelectElement).value;
        socket.emit('join', `${selectedOption}`);
        console.log('Joined room ', selectedOption);
      });
    }
  });
}

export { setupSocketListeners };
