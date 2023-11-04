import express from 'express';
import cors from 'cors';

const PORT = 3002;
const APP = express();
APP.use(cors());

// Serve static files from the 'public' directory
APP.use(express.static('public'));

APP.get('/', (req, res) => {
    res.send('ok');
});

// Start the Express server
APP.listen(PORT, () => {
    console.log('listening on port', PORT);
});
