const express = require('express')
var cors = require('cors')
const socketio = require('socket.io')
var http=require('http')
var app = express();
var server = http.createServer(app);
const PORT = process.env.PORT || 5000;


const {addUser, removeUser, getUser, getUsersInRoom } = require('./Users')

var io = socketio(server);


const router =require('./router');
const { ifError } = require('assert');

app.use(router);
app.use(cors)



io.on('connection', (socket)=> {

    socket.on('join',({name, room},callback)=>{

    const {error, user}= addUser({id: socket.id, name , room});   

    if(error) return callback(error)

    socket.emit('message',{user: 'admin', text: `${user.name}, welcome to ${user.room}`});    
    socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} has joined.` })

    socket.join(user.room)

    callback();
    });

    socket.on('sendMessage', (message, callback)=>{
       const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text:message})
    })

    socket.on('disconnect', ()=>{
        console.log('user has left');
    })

    
});


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


