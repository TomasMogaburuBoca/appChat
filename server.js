const express = require ('express');
const app = express();
const server = require('http').Server(app);
const io =  require ('socket.io')(server);

let messages = [];

app.use (express.static('public'));

io.on ('connection', function(socket){
    console.log('New user connected');
    socket.emit ('messages', messages);

socket.on ('new-message', function (data){
    messages.push(data);
    io.socket.emit('messages', messages);
    });
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () =>{
    console.log(`Server Http whit Websocket listening in port ${srv.address().port}`);
})
srv.on('error', error =>console.log(error));