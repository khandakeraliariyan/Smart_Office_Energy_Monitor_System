const Alert = require("../models/Alert");
const Device = require("../models/Device");

class AlertService {

    async getActiveAlerts() {
        return await Alert.find({
            resolved: false,
        }).populate("room");
    }

    async createAlert(data) {
        return await Alert.create(data);
    }

    async resolveAlert(id) {
        return await Alert.findByIdAndUpdate(
            id,
            { resolved: true },
            { new: true }
        );
    }

    async checkAlerts() {
        await this.checkAfterHours();

        // Future Rules
        // await this.checkHighPower();
        // await this.checkRoomActivity();
        // await this.checkPowerSpike();
    }

    async checkAfterHours() {

        const currentHour = new Date().getHours();

        // Office hours: 9AM - 5PM
        if (currentHour >= 9 && currentHour < 17) {
            return;
        }

        const activeDevices = await Device.find({
            status: true,
        }).populate("room");

        for (const device of activeDevices) {

            const existingAlert = await Alert.findOne({
                type: "AFTER_HOURS",
                resolved: false,
                room: device.room._id,
                message: {
                    $regex: device.name,
                    $options: "i",
                },
            });

            if (existingAlert) continue;

            await Alert.create({
                type: "AFTER_HOURS",
                title: "Device Active After Office Hours",
                message: `${device.name} in ${device.room.name} is still ON.`,
                room: device.room._id,
                severity: "HIGH",
            });
        }
    }
}

module.exports = new AlertService();