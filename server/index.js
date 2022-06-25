const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 8080;
var cors = require("cors");
var io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

curTime = 0;
pause = false;

setInterval(function () {
  if (pause === false) {
    curTime += 1;
  }
}, 1000);

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  //console.log('new client connected');

 // socket.emit("timestamp", curTime);

  setInterval(function () {
    socket.emit("timestamp", curTime);
  }, 1000);

  //on recieving a pause from the client
  socket.on("pause", (recieved) => {
    curTime = recieved.time;
    pause = recieved.bool;
    //emit the currenttime and paused state
    socket.emit("pause", { bool: pause, time: curTime });
  });
});
