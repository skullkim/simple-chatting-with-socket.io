//const { default: axios } = require("axios");

const chat_lists = document.getElementById('chat-lists');

window.onload = () => {
    axios.get('/chat/nickname')
        .then((res) => {
            const {data:{nick}} = res;
            const new_mem = document.createElement('div');
            new_mem.className = "new-member";
            new_mem.innerText = `${nick} access`;
            chat_lists.appendChild(new_mem);
        })
        .catch((err) => console.error(err));
}


const send_btn = document.getElementById('send-btn');
send_btn.addEventListener('click', () => {
    const wrote_message = document.getElementById('message');
    const message = document.createElement('div');
    message.className = "my-message";
    message.innerText = wrote_message.value;
    chat_lists.appendChild(message);
})