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
            const replyPayload = this.buildReplyPayload(question, dashboardData, aiInsight, answer);

            return {
                answer,
                source: "shared-backend",
                lastUpdated: dashboardData.lastUpdated,
                ...replyPayload,
            };
        } catch (error) {
            logger.error("Discord office answer failed", error);
            return {
                answer: "I could not retrieve the current office status right now. Please try again in a moment.",
                source: "shared-backend",
                lastUpdated: new Date(),
                replyType: "summary",
                embedTitle: "Office Status",
                embedDescription: "I could not retrieve the latest office status right now.",
                embedColor: 0xF59E0B,
                embedFields: [],
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

        const alertSummary = activeAlerts.length
            ? activeAlerts.slice(0, 3).map((alert) => alert.message).join(" | ")
            : "No active alerts";

        if (normalizedQuestion.includes("alert")) {
            return activeAlerts.length
                ? `🚨 There are ${activeAlerts.length} active alert(s): ${alertSummary}.`
                : "✅ There are no active alerts. Everything appears to be running normally.";
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
                            return `${deviceName}: ${statusEmoji} ${device?.status ? "ON" : "OFF"}`;
                        })
                        .join("\n");

                    return `${roomName}\n${deviceLines}`;
                })
                .join("\n\n");

            return roomDeviceBreakdown || "No devices found.";
        }

        if (normalizedQuestion.includes("room") || normalizedQuestion.includes("power")) {
            const roomEntries = Object.entries(roomPower);
            const roomBreakdown = roomEntries.length
                ? roomEntries
                    .map(([room, power]) => `${room}: ${power} Watts`)
                    .join("\n")
                : "No room data available";

            const alertMessage = activeAlerts.length
                ? `⚠️ ${activeAlerts.length} active alert(s) currently.`
                : "✅ No active alerts.";

            return `The office is currently using ${totalPower} Watts of power.\n\nRoom breakdown:\n${roomBreakdown}\n\n${alertMessage}`;
        }

        const fallback = aiInsight && typeof aiInsight === "string"
            ? aiInsight.trim()
            : `Office snapshot: ${deviceCount} connected devices, ${activeAlerts.length} active alerts, and ${totalPower}W total power usage.`;

        return fallback;
    }

    buildReplyPayload(question, dashboardData, aiInsight, answer) {
        const normalizedQuestion = (question || "").toLowerCase();
        const totalPower = dashboardData?.totalPower ?? 0;
        const roomPower = dashboardData?.roomPower ?? {};
        const activeAlerts = dashboardData?.alerts ?? [];
        const devices = dashboardData?.devices ?? [];
        const deviceCount = devices.length;

        if (normalizedQuestion.includes("device") && normalizedQuestion.includes("status")) {
            const rooms = {};
            devices.forEach((device) => {
                const roomName = device?.room?.name || "Unknown Room";
                if (!rooms[roomName]) rooms[roomName] = [];
                rooms[roomName].push(device);
            });

            const embedFields = Object.entries(rooms).map(([roomName, roomDevices]) => ({
                name: roomName,
                value: roomDevices
                    .map((device) => `${device?.name || "Unnamed device"}: ${device?.status ? "● ON" : "○ OFF"}`)
                    .join("\n"),
                inline: false,
            }));

            return {
                replyType: "device",
                embedTitle: "Device Status",
                embedDescription: "Live status for the office equipment.",
                embedColor: 0x5865F2,
                embedFields,
                embedFooterText: `${deviceCount} devices tracked`,
            };
        }

        if (normalizedQuestion.includes("alert")) {
            return {
                replyType: "alert",
                embedTitle: "Alert Status",
                embedDescription: answer,
                embedColor: activeAlerts.length ? 0xF59E0B : 0x22C55E,
                embedFields: activeAlerts.length
                    ? activeAlerts.slice(0, 3).map((alert) => ({
                        name: alert?.message || "Alert",
                        value: alert?.severity || "Active",
                        inline: false,
                    }))
                    : [{ name: "Status", value: "No active alerts", inline: false }],
            };
        }

        if (normalizedQuestion.includes("room") || normalizedQuestion.includes("power")) {
            const embedFields = Object.entries(roomPower).map(([room, power]) => ({
                name: room,
                value: `${power} Watts`,
                inline: true,
            }));

            return {
                replyType: "power",
                embedTitle: "Power Overview",
                embedDescription: `Current total usage is ${totalPower} Watts.`,
                embedColor: activeAlerts.length ? 0xEF4444 : 0x10B981,
                embedFields,
                embedFooterText: activeAlerts.length ? `${activeAlerts.length} active alert(s)` : "All systems normal",
            };
        }

        return {
            replyType: "summary",
            embedTitle: "Office Summary",
            embedDescription: answer,
            embedColor: 0x2563EB,
            embedFields: [
                { name: "Connected Devices", value: `${deviceCount}`, inline: true },
                { name: "Active Alerts", value: `${activeAlerts.length}`, inline: true },
            ],
            embedFooterText: "Updated from the shared backend",
        };
    }
}

module.exports = new DiscordService();
