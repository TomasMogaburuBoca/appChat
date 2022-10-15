const express = require ('express');
const app = express();
const server = require('http').Server(app);
const io =  require ('socket.io')(server);
const Contenedor = require ('./public/js/Contenedor')



app.use (express.static('public'));

const containerMessages = new Contenedor ('chat.txt')
const productsProducts = new Contenedor ('products.txt')

let messages = [];
let products = [];



io.on ('connection', (socket) =>{
    console.log('New user connected');
    socket.emit ('messages', messages);
    socket.emit('products', products)
    socket.on('new-message', message =>{
        io.socket.emit('messages', message);
            if(messages.length==0){
                messages.push(message);
                containerMessages.save(message);
            }else{
                messages.push(message);
                containerMessages.save(message);
            }
    })

socket.on ('new-products', product =>{
    io.socket.emit('products', products)
        if(products.length==0){
            products.push(product);
            containerProducts.save(products)
        }else{
            products.push(product);
            containerProducts.save(product)
        }
    });
});


const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () =>{
    console.log(`Server Http whit Websocket listening in port ${srv.address().port}`);
})
srv.on('error', error =>console.log(error));