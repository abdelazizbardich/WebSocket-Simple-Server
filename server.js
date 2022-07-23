const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const UserController = new (require('./userController'))();


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

    // Handle the new localisation position event
    socket.on('newLocalisationPosition', async (msg) => {

        // Validate recieved data
        if(!(msg.userId && msg.localization.latitude && msg.localization.longitude)) return;

        // Get the user
        const user =  UserController.getUser(msg.userId);

        // If the user doesn't exist
        if(!user) return;

        // Set new user localisation position
        user.localization = msg.localization;

        // Update the user
        const newUsers = await UserController.updateUser(msg.userId, user);

        // Send the new sokcet Connected users data to all the clients exept sender if the user is updated
        if(newUsers){
            socket.broadcast.emit('newMapData', newUsers);
        }
    });

});

server.listen(3000, () => {
    console.log('Express and Socket Server are listening on port 3000');
});