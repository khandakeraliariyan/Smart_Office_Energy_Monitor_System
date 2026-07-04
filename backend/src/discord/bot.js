const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;
const apiBaseUrl = process.env.DISCORD_BACKEND_URL || "http://localhost:5000";

if (!token) {
    console.warn("⚠️ Discord bot disabled: DISCORD_BOT_TOKEN is not set.");
} else {

const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

console.log("🔄 Attempting to log in Discord bot...");
console.log("ℹ️ Message content intent is enabled for command parsing and greeting replies.");

client.once(Events.ClientReady, (readyClient) => {
    console.log(`✅ Discord bot logged in as ${readyClient.user.tag}`);
});

client.on(Events.Error, (error) => {
    console.error("❌ Discord bot error:", error);
});

client.on(Events.Warn, (warning) => {
    console.warn("⚠️ Discord bot warning:", warning);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const content = message.content?.trim() || "";
    const normalizedContent = content.toLowerCase();

    console.log(`📨 Discord message received: ${content}`);

    if (normalizedContent === "hello" || normalizedContent.startsWith("hello ")) {
        await message.reply("Hello! How are you?");
        return;
    }

    if (!content.startsWith("!office")) return;

    const question = content.replace(/^!office\s*/i, "").trim();

    try {
        const response = await axios.get(`${apiBaseUrl}/api/v1/discord/ask`, {
            params: { question },
        });

        const answer = response?.data?.data?.answer || "No office data available.";

        await message.reply(answer);
    } catch (error) {
        console.error("Discord bot request failed", error.message);
        await message.reply("I could not fetch the office status right now.");
    }
});

client.login(token).catch((error) => {
    console.error("❌ Discord bot is offline. Login failed:", error.message);
});
}
