const { GoogleGenerativeAI } = require("@google/generative-ai");

const PowerService = require("./power.service");

const AlertService = require("./alert.service");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

class AIService {

    buildFallbackInsight(question = "", power = {}, alerts = []) {
        const totalPower = power?.totalPower ?? 0;
        const roomPower = power?.roomPower ?? {};
        const activeAlerts = alerts ?? [];
        const roomSummary = Object.entries(roomPower)
            .slice(0, 3)
            .map(([room, usage]) => `${room}: ${usage}W`)
            .join(", ");

        const alertSummary = activeAlerts.length
            ? `${activeAlerts.length} active alert${activeAlerts.length > 1 ? "s" : ""} need attention.`
            : "No active alerts are currently reported.";

        const questionContext = question?.trim()
            ? `You asked: ${question}`
            : "Here is a quick office update";

        return `${questionContext}. The office is currently using ${totalPower}W of power. ${alertSummary}${roomSummary ? ` Room usage: ${roomSummary}.` : ""}`;
    }

    async generateInsight(question = "") {

        const power =
            await PowerService.getCurrentPowerUsage();

        const alerts =
            await AlertService.getActiveAlerts();

        if (!process.env.GEMINI_API_KEY) {
            return this.buildFallbackInsight(question, power, alerts);
        }

        const prompt = `
You are an energy efficiency expert helping an office support bot.

User Question:
${question || "Give a general office status update"}

Current Total Power:
${power.totalPower} W

Room Power:
${JSON.stringify(power.roomPower)}

Active Alerts:
${alerts.map(a => a.message).join("\n")}

Provide a concise answer in plain English, max 120 words.
`;

        try {
            const model =
                genAI.getGenerativeModel({
                    model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite"
                });

            const result =
                await model.generateContent(prompt);

            return result.response.text();
        } catch (error) {
            console.warn("Gemini insight unavailable, using fallback summary.", error?.message || error);
            return this.buildFallbackInsight(question, power, alerts);
        }

    }

}

module.exports =
    new AIService();