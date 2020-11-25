const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname+"/dist/aselpanda")));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+"/dist/aselpanda/index.html"))
  })


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    
    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message,userId)
    });

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
console.log("connected!");
})


server.listen(process.env.PORT||3030)