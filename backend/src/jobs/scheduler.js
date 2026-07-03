const cron = require("node-cron");

const AlertService = require("../services/alert.service");
const PowerService = require("../services/power.service");

const logger = require("../utils/logger");

const startScheduler = () => {

    logger.info("Scheduler Started");

    cron.schedule("* * * * *", async () => {

        try {

            logger.info("Running Scheduled Jobs");

            await AlertService.checkAlerts();

            await PowerService.savePowerSnapshot();

        } catch (error) {

            logger.error("Scheduler Error", error);

        }

    });

};

module.exports = startScheduler;