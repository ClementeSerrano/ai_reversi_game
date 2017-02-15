const express = require('express')
const bodyParser = require('body-parser')
const reversi = require('./reversi')
const crypto = require('crypto')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (client) => {
    console.log('a client connected', client.id);

    client.on('disconnecting', () => {
        for (var room in client.rooms) {
            client.to(room).broadcast.emit('playerLeft');
        }
    });

    client.on('disconnect', () => {
        console.log('a client disconnected', client.id);        
    });

    client.on('joinGame', (room) => {
        client.join(room);
        client.to(room).broadcast.emit('playerJoined');
    });

    client.on('startNewGame', () => {
        client.to(client.id).broadcast.emit('newGameStarted');
    })

    client.on('sendStep', ({step, room}) => {        
        client.to(room).broadcast.emit('stepReceived', step);
    });

    client.on('sendMessage', ({msg, room}) => {        
        client.to(room).broadcast.emit('messageReceived', msg);
    });
});

var port = process.env.PORT || 8080; 
http.listen(port);