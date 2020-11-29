var express = require('express');
const { nextTick } = require('process');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000, function(){
    console.log('listening for requests on port 2030');
});

var io = socket(server);
app.use(express.static('dist/aselpanda'))


// app.on('/',(req,res)=>{
//     res.sendFile('index.html');
// })

app.on('*',(req,res)=>{
    res.redirect('index.html');
})


io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
            console.log(`New connection ${userId} `)

        socket.on('chat', function(data){
            io.to(roomId).sockets.emit('chat', data);
        });

        socket.on('typing', function(data){
            io.to(roomId).sockets.emit('typing', userId);
        });

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
});
