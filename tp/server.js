const express = require('express');
const CONFIG = require('./config.json');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const http = require("http");

global.CONFIG = CONFIG;

const controller = require('./app/controllers/Controller')
const AppMiddleware = require('./app/middleware/AppMiddleware.js')
const userManager = require('./app/services/UserService')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    const idUser = socket.handshake.query.id;
    // Utilisez l'ID de utilisation comme nécessaire
    console.log('User connected with ID:', idUser);
    userManager.addUser(socket, idUser)
    controller.init({io: io, socket: socket});
    socket.on('disconnect', () => {
        console.log('User disconnected');
        userManager.removeUser(socket)
        io.emit('refreshUsers',[]);
    });
});

// Déclaration des middleware
app.use(AppMiddleware.logRequests);
app.use(bodyParser.json({}));

// Ressources statiques
app.use(express.static(CONFIG.www));

// Démarrage de l'application
server.listen(CONFIG.port, () => console.log(`Listening http://localhost:${CONFIG.port}`));

controller.getCardsFromSpring();
controller.getUsersFromSpring();
