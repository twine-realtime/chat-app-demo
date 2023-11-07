import { TwineClientLibrary } from './twineClientLibrary.mjs'
// import { TwineServerLibrary } from './twineServerLibrary.mjs';
import { TwineServerLibrary } from "twine-server-library";

const host = 'https://twine-rt.com';
const twine = new TwineClientLibrary(host);
const twineServer = new TwineServerLibrary(host);

const logMessageInfo = (data) => {
  console.log('data from client: ', data);
  console.log('room id from client: ', data.room);
}

const addMessageToDOM = (data) => {
  const messages = document.getElementById('messages');
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

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const sendBtn = document.getElementById('send');
  const pubOptions = document.getElementById('pub-options');
  const subOptions = document.getElementById('sub-options');
  const unsubOptions = document.getElementById('unsub-options');
  const disconnectBtn = document.getElementById('disconnect');
  let roomToPublishTo;

  pubOptions.addEventListener('change', () => {
    roomToPublishTo = pubOptions.value;
  })

  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (roomToPublishTo) {
      const message = input.value;
      twineServer.publish(roomToPublishTo, { message }); 
      roomToPublishTo = '';
      input.value = '';
      pubOptions.selectedIndex = 0;
    }
  })

  subOptions.addEventListener('change', () => {
    const selectedOption = subOptions.value;
    twine.subscribe(selectedOption);
  });

  unsubOptions.addEventListener('change', () => {
    const deSelectedOption = unsubOptions.value;
    twine.unsubscribe(deSelectedOption);
  });

  disconnectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    twine.disconnect();
    setTimeout(() => {
      twine.connect();
    }, 10000)
  });
});
