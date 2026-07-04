const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;
const port = process.env.PORT;
const apiBaseUrl = process.env.DISCORD_BACKEND_URL;

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
console.log("ℹ️ Message content intent is enabled so the bot can read commands in regular chat channels.");

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
    const botId = client.user?.id;
    const isMentioned = !!botId && message.mentions.users.has(botId);
    const isPrefixCommand = content.toLowerCase().startsWith("!office");
    const isOfficeMentionCommand = isMentioned && /\boffice\b/i.test(content);

    if (!isPrefixCommand && !isOfficeMentionCommand) return;

    const question = isPrefixCommand
        ? content.replace(/^!office\s*/i, "").trim()
        : content.replace(new RegExp(`<@!?${botId}>`, "i"), "").replace(/\boffice\b/i, "").trim();

    if (!question) {
        await message.reply("Try asking me about office status, alerts, or room power.");
        return;
    }

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
