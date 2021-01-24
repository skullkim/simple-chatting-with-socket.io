const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {path: '/socket.io'});
    io.on('connection', (socket) => {
        const req = socket.request;
        //console.log(req);
        console.log('connect');
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        socket.on('disconnect', () => {
            console.log(`disconnect client ${ip} ${socket.id}`);
        });
        socket.on('error', (err) => {
            console.error(err);
        });
        socket.on('newMember', (data) => {
            console.log(data);
            socket.broadcast.emit('join', `${data} join this room`);
        })
        socket.on('reply', (data) => {
            console.log(data);
            socket.broadcast.emit('news', `${data}`);
        })
    });
}