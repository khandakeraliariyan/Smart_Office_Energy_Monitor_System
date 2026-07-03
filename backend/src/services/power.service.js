const Device = require("../models/Device");

class PowerService {

    async getCurrentPowerUsage() {

        const devices = await Device.find().populate("room");

        let totalPower = 0;

        const roomPower = {};

        devices.forEach(device => {

            const power = device.status
                ? device.powerRating
                : 0;

            totalPower += power;

            const roomName = device.room.name;

            if (!roomPower[roomName]) {

                roomPower[roomName] = 0;

            }

            roomPower[roomName] += power;

        });

        return {

            totalPower,

            roomPower,

            devices

        };

    }

}

module.exports = new PowerService();