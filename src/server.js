const r6 = require('r6s-stats-api');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let statistics = {};

// serving the html page to browser
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// listen for events from client
io.on('connection', (socket) => {
    // listen specific named event
    /*socket.on('new-notice', (data) => {
        io.emit('add-to-board', data);
    });*/

    socket.on('request-player-data', (data) => {
        let platform = data.platform;
        let username = data.username;

        general(platform, username).then(() => {
            rank(platform, username).then(() => {
                socket.emit('player-data', statistics);
            });
        });
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

async function general(platform, username) {
    await r6.general(platform, username).then(general => {
        statistics["general"] = general;
    });
}

async function casual(platform, name) {
    await r6.casual(platform, name).then(stats => {
        console.log('casual', stats);
    });
}

async function rank(platform, name) {
    await r6.rank(platform, name).then(rank => {
        statistics["rank"] = rank;
    });
}

/*
casual();
rank();*/