const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const { initializeSocket } = require("./sockets/socket");

const startSimulator = require("./simulator/deviceSimulator");
const startScheduler = require("./jobs/scheduler");
require("./discord/bot");

const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        const server = http.createServer(app);

        const io = initializeSocket(server);

        startSimulator(io);

        startScheduler();

        server.listen(PORT, () => {
            logger.info("Server Started", {
                Port: PORT,
                Environment: process.env.NODE_ENV,
            });
        });
    } catch (error) {
        logger.error("Server Startup Failed", error);
        process.exit(1);
    }
};

startServer();