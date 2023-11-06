import express from 'express';
const app = express();

// const cors = require('cors'); // package.json has 'type': module so this won't work
import cors from 'cors';
app.use(cors());

app.use(express.static('./public'));

const PORT = 3002;

app.get('/', (req, res) => {
  console.log("this route is being run");
	res.send('ok');
});

app.listen(PORT, () => {
	console.log('listening on port', PORT);
})