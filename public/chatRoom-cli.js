const chat_lists = document.getElementById('chat-lists');
const socket = io.connect('http://localhost:8080', {
    path: '/socket.io',
});
let my_nick;

window.onload = () => {
    axios.get('/chat/nickname')
        .then((res) => {
            const {data:{nick}} = res;
            my_nick = nick;
            socket.emit('newMember', `${nick}`);
        })
        .catch((err) => console.error(err));
}
function makeDiv(text, class_name){
    const div = document.createElement('div');
    div.className = class_name;
    div.innerText = text;
    return div;
}

socket.on('join', (data) => {
    console.log(data);
    chat_lists.appendChild(makeDiv(data, "new-member"));
});

socket.on('news', (data) => {
    const {nick, message} = JSON.parse(data);
    console.log(nick, message);
    chat_lists.appendChild(makeDiv(nick, "nick-name-others"));
    chat_lists.appendChild(makeDiv(message, "others-message"));
});

const send_btn = document.getElementById('send-btn');
send_btn.addEventListener('click', () => {
    const wrote_message = document.getElementById('message');
    chat_lists.appendChild(makeDiv(my_nick, "nick-name-my"));
    chat_lists.appendChild(makeDiv(wrote_message.value, "my-message"));
    const req = {
        nick: my_nick,
        message: wrote_message.value,
    };
    socket.emit('reply', JSON.stringify(req));
})