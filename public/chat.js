//connect on the front end to socket.io
let socket = io.connect('http://localhost:2000');

//get data fields by id, store in variables
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let button = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

//Emit events

button.addEventListener('click', function(){
    //emit message down socket
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});


//
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})
//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});