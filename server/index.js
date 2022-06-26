const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 8080;
var cors = require("cors");
var io = require("socket.io")(server, { cors: { origin: "*" } });
const multer = require('multer');
const mongoose = require('mongoose');

//setup for multier for handling uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

var upload = multer({ storage: storage });

//setup for mongodb for storing the uploaded files

mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => console.log('DB connected'))
  .catch(err => console.error(err));


app.use("/upload", express.static('./uploads'))

app.get('/posts', (req, res) => {
    Test.find({})
        .then(response => res.json(response))
        .catch(err => console.error(err));
});


app.post('/submit', upload.single('file'), (req, res) => {
    const data = new Test({ description: req.body.text, file_path: req.file.path });
    data.save()
        .then(response => console.log(response))
        .catch(err => console.error(err));
});


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
