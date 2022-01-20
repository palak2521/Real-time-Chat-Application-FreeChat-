// node server which will handle socket io connections
const io = require("socket.io")(8000);
const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });// for new user joining the server

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });// for the users sending message 

    socket.on('disconnect', message=>{
       socket.broadcast.emit('left', users[socket.id]);
       delete users[socket.id];
   });// for the user leaving the chat
})