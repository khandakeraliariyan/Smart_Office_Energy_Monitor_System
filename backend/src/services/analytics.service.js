const PowerLog = require("../models/PowerLog");
const Device = require("../models/Device");

class AnalyticsService {

    async getAnalytics() {

        const logs = await PowerLog.find()
            .sort({ createdAt: -1 })
            .limit(100);

        const devices = await Device.find();

        const totalDevices = devices.length;

        const activeDevices = devices.filter(
            d => d.status
        ).length;

        const powers = logs.map(
            log => log.totalPower
        );

        const peakPower =
            powers.length
                ? Math.max(...powers)
                : 0;

        const averagePower =
            powers.length
                ? Math.round(
                    powers.reduce((a, b) => a + b, 0) /
                    powers.length
                )
                : 0;

        return {

            peakPower,

            averagePower,

            activeDevices,

            inactiveDevices:
                totalDevices - activeDevices,

            deviceUsage:
                Math.round(
                    (activeDevices / totalDevices) * 100
                ) || 0

        };

    }

}

module.exports =
    new AnalyticsService();