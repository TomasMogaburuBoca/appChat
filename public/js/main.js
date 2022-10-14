let socket = io.connect();

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    let html = data.map(function(elem){
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em>
            </div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html;
}

function addMessages(){
    let message ={
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
};