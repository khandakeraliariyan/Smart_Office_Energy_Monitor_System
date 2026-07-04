const { GoogleGenerativeAI } = require("@google/generative-ai");

const PowerService = require("./power.service");

const AlertService = require("./alert.service");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

class AIService {

    async generateInsight(question = "") {

        const power =
            await PowerService.getCurrentPowerUsage();

        const alerts =
            await AlertService.getActiveAlerts();

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

        const model =
            genAI.getGenerativeModel({
                model: "gemini-2.5-flash-lite"
            });

        const result =
            await model.generateContent(prompt);

        return result.response.text();

    }

}

module.exports =
    new AIService();