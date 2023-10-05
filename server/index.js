const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let texts = []; // Hier speichern Sie Texte zwischen Sitzungen

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('loadTexts', texts);

    socket.on('textChanged', (newText) => {
        // Textänderungen hier speichern und an alle Clients senden
        texts.push(newText);
        io.emit('loadTexts', texts);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
