const Device = require("../models/Device");
const Alert = require("../models/Alert");

class DashboardService {

    async getDashboardData() {

        const devices = await Device.find().populate("room");

        const alerts = await Alert.find({
            resolved: false
        }).sort({ createdAt: -1 });

        let totalPower = 0;

        const roomPower = {};

        devices.forEach(device => {

            totalPower += device.currentPower;

            const roomName = device.room.name;

            if (!roomPower[roomName]) {

                roomPower[roomName] = 0;

            }

            roomPower[roomName] += device.currentPower;

        });

        return {

            devices,

            alerts,

            totalPower,

            roomPower,

            lastUpdated: new Date()

        };

    }

}

module.exports = new DashboardService();