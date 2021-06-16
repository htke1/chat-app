import {Link} from 'react-router-dom'
import { useState } from 'react'
import './join.css'
export const Join = () =>{

    const [name,setName]=useState('');
    const [room,setRoom] =useState('');
    return(
        <div id="Join-section">
            <h2>Join room:</h2>
            <input required type="text" id="name-input" placeholder="name" onChange={(event)=>{setName(event.target.value)}}/>
            <input reqiured type="text" id="name-room" placeholder="room" onChange={(event)=>{setRoom(event.target.value)}}/>
            <Link to={`/chat?name=${name}&room=${room}`}>
            <button className="button">Check in</button>
            </Link>
        </div>
    )
}