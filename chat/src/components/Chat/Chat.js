import QueryString  from "query-string"
import { useState, useEffect } from "react"
import io  from "socket.io-client";
import { videochat } from "../VideoChat/videochat";
import './chat.css'
import ScrollBottom from 'react-scroll-to-bottom'
import Message from '../Message/message'
let socket;
const ENDPOINT="http://localhost:5000/";
export const Chat = ({location}) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
     const {name, room} = QueryString.parse(location.search);

    socket = io(ENDPOINT,{transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("connect",function(){
        console.log("socket connected");
    });


    socket.on('broadcast', function(data){
         setMessage(data);
    })
    socket.emit('join', {name, room},()=>{

        
    })

    setName(name);
     setRoom(room);
     
    },[ location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message])
        })
    },[messages])

    function sendMessage(event){
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }
       
    }
    console.log(message, messages)
    return(
        <div id="chat-section">
            <h2>Chat Room: {room}</h2>
            <h3>User: {name}</h3>
            <videochat />
            <button>video chat</button>
            <container id="message-box" >
                <ScrollBottom>
                    { messages.map((message,i)=><div key={i}> <Message message={message} name={name}/> </div>)}
                </ScrollBottom>
            </container>
            <input type="text" 
            onChange={(event)=>setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            placeholder="type..."/>
           <a href='/'> <button>Exit</button></a>
        </div>
    )
}