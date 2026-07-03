const Device = require("../models/Device");
const DeviceService = require("./device.service");
const PowerService = require("./power.service");
const AlertService = require("./alert.service");

class SimulatorService {

    async simulate(io) {

        const hour = new Date().getHours();

        const officeOpen = hour >= 9 && hour < 17;

        const devices = await Device.find();

        if (!devices.length) return;

        const randomDevice = devices[Math.floor(Math.random() * devices.length)];

        let newStatus;

        if (officeOpen) {

            if (randomDevice.type === "Light") {

                newStatus = Math.random() < 0.85;

            } else {

                newStatus = Math.random() < 0.70;

            }

        } else {

            newStatus = Math.random() < 0.05;

        }

        const updated = await DeviceService.updateStatus(
            randomDevice._id,
            newStatus
        );

        const power = await PowerService.getCurrentPowerUsage();

        await AlertService.checkAfterHours();

        io.emit("deviceUpdated", updated);

        io.emit("powerUpdated", power);

        io.emit("alertsUpdated");

    }

}

module.exports = new SimulatorService();