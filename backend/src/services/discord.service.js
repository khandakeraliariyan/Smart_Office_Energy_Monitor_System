const DashboardService = require("./dashboard.service");
const AIService = require("./ai.service");
const logger = require("../utils/logger");

class DiscordService {
    async getOfficeAnswer(question) {
        try {
            const [dashboardData, aiInsight] = await Promise.all([
                DashboardService.getDashboardData(),
                AIService.generateInsight(question),
            ]);

            const answer = this.buildOfficeAnswer(question, dashboardData, aiInsight);

            return {
                answer,
                source: "shared-backend",
                lastUpdated: dashboardData.lastUpdated,
            };
        } catch (error) {
            logger.error("Discord office answer failed", error);
            return {
                answer: "I could not retrieve the current office status right now. Please try again in a moment.",
                source: "shared-backend",
                lastUpdated: new Date(),
            };
        }
    }

    buildOfficeAnswer(question, dashboardData, aiInsight) {
        const normalizedQuestion = (question || "").toLowerCase();
        const totalPower = dashboardData?.totalPower ?? 0;
        const roomPower = dashboardData?.roomPower ?? {};
        const activeAlerts = dashboardData?.alerts ?? [];
        const deviceCount = dashboardData?.devices?.length ?? 0;

        const roomSummary = Object.entries(roomPower)
            .map(([room, power]) => `${room}: ${power}W`)
            .join(", ");

        const alertSummary = activeAlerts.length
            ? activeAlerts.slice(0, 3).map((alert) => alert.message).join(" | ")
            : "No active alerts";

        if (normalizedQuestion.includes("alert")) {
            return `Current office alert status: ${alertSummary}.`;
        }

        if (normalizedQuestion.includes("room") || normalizedQuestion.includes("power")) {
            return `Office power overview: total usage is ${totalPower}W. Room breakdown: ${roomSummary || "no rooms reported"}.`;
        }

        const fallback = aiInsight && typeof aiInsight === "string"
            ? aiInsight.trim()
            : `The office currently has ${deviceCount} connected devices, ${activeAlerts.length} active alerts, and ${totalPower}W of total power usage.`;

        return fallback;
    }
}

module.exports = new DiscordService();
