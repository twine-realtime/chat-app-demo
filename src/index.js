// const express = require('express');
import express from 'express';
const app = express();

import cors from "cors";
app.use(cors());

app.use(express.static('./public'));

const PORT = 4000;

app.get('/', (req, res) => {
  console.log("this route is being run");
	res.send('ok');
});

app.listen(PORT, () => {
	console.log('listening on port', PORT);
})