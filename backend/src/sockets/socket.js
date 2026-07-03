const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: "*"

        }

    });

    io.on("connection", (socket) => {

        console.log(`🟢 Client Connected: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`🔴 Client Disconnected: ${socket.id}`);

        });

    });

    return io;

};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO
};