const io = require('socket.io')(process.env.PORT || 3000,{
  cors:{origin:"*"}})
const users = {}
io.on('connection', socket => {
  socket.on('new-user', nam => {
    users[socket.id] = nam
    socket.broadcast.emit('user-connected', nam)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, nam: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


