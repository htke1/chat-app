import QueryString  from "query-string"
import { useState, useEffect } from "react"
import io  from "socket.io-client";
let socket;
const ENDPOINT="http://localhost:5000/";
export const Chat = ({location}) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(()=>{
     const {name, room} = QueryString.parse(location.search);

    socket = io(ENDPOINT,{transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("connect",function(){
        console.log("socket connected");
    });

    socket.emit('join', {name, room});

     setName(name);
     setRoom(room);
    },[ location.search])
    return(
        <div>
            <h2>Chat Room: {room}</h2>
            <h3>User: {name}</h3>
            <textarea />
            <input type="text" placeholder="type..."/>

            <button>Exit</button>
        </div>
    )
}