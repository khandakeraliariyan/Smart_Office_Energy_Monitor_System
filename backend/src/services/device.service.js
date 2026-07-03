const Device = require("../models/Device");

class DeviceService {

    async getAllDevices() {
        return await Device.find().populate("room");
    }

    async getDeviceById(id) {
        return await Device.findById(id);
    }

    async updateDevice(id, data) {
        return await Device.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        );
    }

}

module.exports = new DeviceService();