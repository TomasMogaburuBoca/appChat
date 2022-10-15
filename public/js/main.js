let socket = io.connect();

socket.on('messages', (data) =>{
    console.log(data);
    render(data);
});
socket.on('products', data =>{
    renderProducts(data);
})

//function render(data){
//    let html = data.map((elem) =>{
//        return(`<div>
//            <strong>${elem.author}</strong>:
//            <em>${elem.text}</em>
//            </div>`)
//    }).join(" ")
//    document.getElementById('messages').innerHTML = html;
//}
function render(data){
    const date = new Date();
    const html = data.map((elem)=>{
        return `<div>
                    <strong style="color:blue;">${elem.autor}</strong> <span style="color:brown";>${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>:
                    <em style="color:green;">${elem.mensaje}</em></div>`
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

const addMessages = (e) =>{
    let message ={
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
};

function renderProducts(data){
    const html = data.map((prod)=>{
        return `<div>
                    <strong>${prod.name}</strong>:
                    <em>${prod.price}</em></div>`
    }).join(" ");
    document.getElementById('products').innerHTML = html;
};

const addProduct = (e) => {
    const product = {
        name: document.getElementById('productName').value,
        price:document.getElementById('price').value
    }
    socket.emit('new-product',product);
    return false;
};

socket.on('messages',(data) =>{render(data);});
socket.on('products',(data) =>{renderProducts(data);});

