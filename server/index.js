const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8080;
var cors = require('cors');
var io = require('socket.io')(server, {cors: {origin: '*'}});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    console.log('new client connected');
	socket.emit('connection',null)
});
