import React, { useState, useEffect, useCallback } from "react";
import socketClient from "socket.io-client";
import Main from "./Main"
import {SocketContext, socket} from "./context/socket.js"


const App = () => {
	return (
		<SocketContext.Provider value={socket}>
			<Main />
    		</SocketContext.Provider>
	)
}

export default App
