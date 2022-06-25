import React from 'react'
import socketio from "socket.io-client";
//import { SOCKET_URL } from "config";
const SERVER = "http://127.0.0.1:8080";
export const socket = socketio.connect(SERVER);
export const SocketContext = React.createContext();

