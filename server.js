const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express server'
  });
});

io.on('connection', (socket) => {

    // if a user connects
    console.log('====================================');
        console.log('A user connected by socket id: ', socket.id);
    console.log('====================================');

    // Handle the disconnect event
    socket.on('disconnect', () => {
        console.log('====================================');
        console.log('A user with Id '+socket.id+' has disconnected');
        console.log('====================================');
    });

    // Handle the message event
    socket.on('message', (msg) => {
        console.log('====================================');
        console.log('Message from user: ', msg);
        console.log('====================================');
    });

    socket.on('message', (msg) => {
        socket.emit('message', msg);
    });

});

server.listen(3000, () => {
    console.log('Express and Socket Server are listening on port 3000');
});