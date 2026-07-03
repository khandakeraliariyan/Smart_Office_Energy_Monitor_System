const Device = require("../models/Device");

class DeviceService {

    async getAllDevices() {
        return await Device.find().populate("room");
    }

    async getDeviceById(id) {
        return await Device.findById(id).populate("room");
    }

    async updateStatus(id, status) {

        const device = await Device.findById(id);

        if (!device) return null;

        device.status = status;

        device.currentPower = status
            ? device.powerRating
            : 0;

        device.lastChanged = new Date();

        await device.save();

        return device.populate("room");

    }

    async getDevicesByRoom(roomId) {

        return await Device.find({
            room: roomId
        });

    }

    async countActiveDevices() {

        return await Device.countDocuments({
            status: true
        });

    }

}

module.exports = new DeviceService();