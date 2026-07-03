const Device = require("../models/Device");

class DeviceService {

    async getAllDevices() {
        return await Device.find().populate("room");
    }

    async getDeviceById(id) {
        return await Device.findById(id).populate("room");
    }

    async updateStatus(id, status) {

        return await Device.findByIdAndUpdate(
            id,
            {
                status,
                lastChanged: new Date()
            },
            {
                new: true
            }
        ).populate("room");

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