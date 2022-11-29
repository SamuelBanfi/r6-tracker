const r6 = require('r6s-stats-api');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var htmlPath = path.join(__dirname, 'public');

var statistics = {};

app.use(express.static(htmlPath));

// serving the html page to browser
app.get('/', (req, res) => {
    res.sendFile(htmlPath + '/index.html');
});

// listen for events from client
io.on('connection', (socket) => {
    socket.on('request-player-data', (data) => {
        let platform = data.platform;
        let username = data.username;

        general(platform, username).then(() => {
            rank(platform, username).then(() => {
                statistics["error"] = statistics["general"] == "TIME_OUT" && statistics["rank"] == "TIME_OUT";
                socket.emit('player-data', statistics);
            });
        });
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

/**
 * Set the general statistics of the player.
 * @param {String} platform 
 * @param {String} username 
 */
async function general(platform, username) {
    await r6.general(platform, username).then(general => {
        statistics["general"] = general;
    });
}

/**
 * Set the ranked statistics of the player.
 * @param {String} platform 
 * @param {String} name 
 */
async function rank(platform, name) {
    await r6.rank(platform, name).then(rank => {
        statistics["rank"] = rank;
    });
}