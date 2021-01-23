const chat_lists = document.getElementById('chat-lists');

const send_btn = document.getElementById('send-btn');
send_btn.addEventListener('click', () => {
    const wrote_message = document.getElementById('message');
    const message = document.createElement('div');
    message.className = "my-message";
    message.innerText = wrote_message.value;
    chat_lists.appendChild(message);
    //chat_lists.appendChild(document.createElement('br'));
})