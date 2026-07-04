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
        const devices = dashboardData?.devices ?? [];
        const deviceCount = devices.length;

        const roomSummary = Object.entries(roomPower)
            .map(([room, power]) => `${room}: ${power}W`)
            .join(", ");

        const alertSummary = activeAlerts.length
            ? activeAlerts.slice(0, 3).map((alert) => alert.message).join(" | ")
            : "No active alerts";

        if (normalizedQuestion.includes("alert")) {
            return `🚨 Alert update: ${alertSummary}.`;
        }

        if (normalizedQuestion.includes("device") && normalizedQuestion.includes("status")) {
            const rooms = {};

            devices.forEach((device) => {
                const roomName = device?.room?.name || "Unknown Room";
                if (!rooms[roomName]) rooms[roomName] = [];
                rooms[roomName].push(device);
            });

            const roomDeviceBreakdown = Object.entries(rooms)
                .map(([roomName, roomDevices]) => {
                    const deviceLines = roomDevices
                        .map((device) => {
                            const statusEmoji = device?.status ? "●" : "○";
                            const deviceName = device?.name || "Unnamed device";
                            return `   • ${deviceName}  ${statusEmoji} ${device?.status ? "ON" : "OFF"}`;
                        })
                        .join("\n");

                    return `- **${roomName}:**\n${deviceLines}`;
                })
                .join("\n");

            return `📱 Device status update:\n\n${roomDeviceBreakdown || "- **No devices found**"}`;
        }

        if (normalizedQuestion.includes("room") || normalizedQuestion.includes("power")) {
            const roomEntries = Object.entries(roomPower);
            const roomBreakdown = roomEntries.length
                ? roomEntries
                    .map(([room, power]) => `- **${room}:** ${power} Watts`)
                    .join("\n")
                : "- **No room data available**";

            const alertMessage = activeAlerts.length
                ? `⚠️ There are ${activeAlerts.length} active alert(s) currently.`
                : "✅ There are no active alerts, so everything seems to be running as expected.";

            return `⚡ The office is currently using **${totalPower} Watts** of power.\n\n🏢 Here's the breakdown by room:\n${roomBreakdown}\n\n${alertMessage}`;
        }

        const fallback = aiInsight && typeof aiInsight === "string"
            ? aiInsight.trim()
            : `🏢 Office snapshot: ${deviceCount} connected devices, ${activeAlerts.length} active alerts, and ${totalPower}W total power usage.`;

        return fallback;
    }
}

module.exports = new DiscordService();
