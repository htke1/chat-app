const express = require('express')
var cors = require('cors')
const socketio = require('socket.io')
var http=require('http')
var app = express();
var server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const {addUser, removeUser, getUser, getUsersInRoom } = require('./Users')

var io = socketio(server);


const router =require('./router')

app.use(router);
app.use(cors)



io.on('connection', (socket)=> {

    console.log('new client connected');
    socket.on('join',({name, room})=>{
    console.log(name)
    })
    socket.on('disconnect', ()=>{
        console.log('user has left');
    })
});


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


