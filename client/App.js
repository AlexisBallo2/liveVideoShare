import React from "react";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
function App() {
        const socket = socketClient(SERVER);
        socket.on("connection", () => {
                console.log("connected with backend");
        });
        return <div className="App"></div>;
}

export default App;
