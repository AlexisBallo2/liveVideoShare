import React, { useState, useContext,useRef, useCallback, useEffect } from "react";
import { SocketContext } from "./context/socket";
import axios from 'axios';
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

    const formRef = useRef(null);
const submit_file = e => {
        e.preventDefault();

        const form_data = new FormData(formRef.current);

        axios({
            url: 'http://localhost:3030/8080',
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: form_data
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    };


  const handlePause = () => {
	  console.log(currentTime);
	  if(paused === true){
		  socket.emit("pause", {bool:false,time:currentTime })
	  } else {
		  socket.emit("pause", {bool:true,time:currentTime})
	  }
  
  };

  return (
    <div classname="App">
      {currentTime}
      <button onClick={handlePause}> Pause/Unpaue </button>
    <div>
       <form onSubmit={submit_file} ref={formRef}>
            <input type="text" name="text" />
            <input type="file" name="file" />
            <input type="submit" value="Submit" />
        </form>
    </div>
    </div>
  );
}

export default Main;
