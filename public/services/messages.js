import { Twine } from './twineLibrary.js'


const host = 'https://twine-rt.com'
const twine = new Twine(host)

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

// fires event when a room is selected from the dropdown
document.addEventListener('DOMContentLoaded', () => {
  // const options = document.getElementById('options');
  const subOptions = document.getElementById('sub-options');
  const unsubOptions = document.getElementById('unsub-options');
  const disconnectBtn = document.getElementById('disconnect');

  subOptions.addEventListener('change', () => {
    const selectedOption = subOptions.value;
    // join room <button value> on change event
    twine.subscribe(selectedOption);
  });

  unsubOptions.addEventListener('change', () => {
    const deSelectedOption = unsubOptions.value;
    // join room <button value> on change event
    twine.unsubscribe(deSelectedOption);
  });

  // options.addEventListener('change', () => {
  //   const selectedOption = options.value;
  //   // join room <button value> on change event
  //   twine.subscribe(selectedOption);
  // });

  disconnectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    twine.disconnect();
    setTimeout(() => {
      twine.connect();
    }, 10000)
  });

});
