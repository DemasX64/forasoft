const socket = require('socket.io');
const express = require('express');
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 4000
const app = express();

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

const io = socket(server);

const onConnection = (Socket) => {
  console.log('connected');
  io.on('disconnect',() => {
    console.log('disconnected')
  })
}

io.on('connect', onConnection)
