import { setCookie } from './cookie';
import { setupSocketListeners } from './socket';

document.addEventListener('DOMContentLoaded', async () => {
    await setCookie();
    setupSocketListeners();
});
