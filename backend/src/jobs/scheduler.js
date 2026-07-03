const cron = require("node-cron");

const AlertService = require("../services/alert.service");

const logger = require("../utils/logger");

const startScheduler = () => {

    logger.info("Scheduler Started");

    // Every minute
    cron.schedule("* * * * *", async () => {

        logger.info("Running Scheduled Jobs");

        await AlertService.checkAfterHours();

    });

};

module.exports = startScheduler;