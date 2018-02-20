//add express to project
let express = require('express');
let socket = require('socket.io');

//Set up app
let app = express();

let server = app.listen(2000, function() {
    console.log('listening to port 2000');
});

//static files

app.use(express.static('public'));

//socket setup - each client has their own server
let io = socket(server);

//check for socket connection, pass instance of socket connection
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});