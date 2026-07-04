const dotenv = require("dotenv");

dotenv.config();

const SimulatorService = require("../services/simulator.service");

const startSimulator = (io) => {

    console.log("🚀 Smart Simulator Started");

    setInterval(async () => {

        try {

            await SimulatorService.simulate(io);

        } catch (err) {

            console.log(err);

        }

    }, 5000);

};

module.exports = startSimulator;