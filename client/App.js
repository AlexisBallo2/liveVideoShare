import React from 'react';
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
function App() {
    var socket = socketClient (SERVER);
	socket.on('connection', 90 => {console.log("connected with backend")})
    return (
        <div classname="App">

	</div>
	)
}

export default App;
