const DiscordService = require("../services/discord.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const askOffice = asyncHandler(async (req, res) => {
    const question = req.body?.question || req.query?.question || "";
    const result = await DiscordService.getOfficeAnswer(question);

    res.status(200).json(
        new ApiResponse(true, "Office status fetched for Discord bot", result)
    );
});

module.exports = {
    askOffice,
};
