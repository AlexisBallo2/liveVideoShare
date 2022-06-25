import React, { useState, useContext, useCallback, useEffect } from "react";
import { SocketContext } from "./context/socket";
//main funciton to house content
function Main() {
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPause] = useState(false);
  const [updatePause, setUpdatePause] = useState(false);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected with backend");
    });

    socket.on("timestamp", (response) => {
	console.log("recieved current timestamp", response);
      setCurrentTime(response);
    });

    socket.on("pause", (response) => {
      console.log("recieved pause brodcast", response);
      setPause(response.bool);
      setCurrentTime(response.time);
    });
    return () => {
      socket.off("connection");
	socket.off("timestamp");
	socket.off("paused");
    };
  }, []);

  const handlePause = () => {
	  console.log(currentTime);
	  if(paused === true) {
		  socket.emit("pause", {bool:false,time:currentTime })
	  } else {
		  socket.emit("pause", {bool:true,time:currentTime})
	  }
  
  };

  return (
    <div classname="App">
      {currentTime}
      <button onClick={handlePause}> Pause/Unpaue </button>
    </div>
  );
}

export default Main;
