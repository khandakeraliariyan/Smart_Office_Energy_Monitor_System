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

        if (currentHour >= 9 && currentHour < 17) {
            return;
        }

        const activeDevices = await Device.find({
            status: true,
        }).populate("room");

        if (!activeDevices.length) return;

        const existingAlerts = await Alert.find({
            type: "AFTER_HOURS",
            resolved: false,
        });

        const existingMessages = new Set(
            existingAlerts.map(alert => alert.message)
        );

        const newAlerts = [];

        for (const device of activeDevices) {

            const message =
                `${device.name} in ${device.room.name} is still ON.`;

            if (existingMessages.has(message)) {
                continue;
            }

            newAlerts.push({

                type: "AFTER_HOURS",

                title: "Device Active After Office Hours",

                message,

                room: device.room._id,

                severity: "HIGH"

            });

        }

        if (newAlerts.length) {

            await Alert.insertMany(newAlerts);

        }

    }
}

module.exports = new AlertService();