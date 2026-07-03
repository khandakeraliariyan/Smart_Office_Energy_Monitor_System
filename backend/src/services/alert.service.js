const Alert = require("../models/Alert");
const Device = require("../models/Device");

class AlertService {

    async getActiveAlerts() {

        return await Alert.find({
            resolved: false
        }).populate("room");

    }

    async createAlert(data) {

        return await Alert.create(data);

    }

    async resolveAlert(id) {

        return await Alert.findByIdAndUpdate(
            id,
            {
                resolved: true
            },
            {
                new: true
            }
        );

    }

}

module.exports = new AlertService();