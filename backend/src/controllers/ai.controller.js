const AIService = require("../services/ai.service");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getInsight = asyncHandler(async (req, res) => {

    const insight =
        await AIService.generateInsight();

    res.json(

        new ApiResponse(

            true,

            "AI Insight",

            insight

        )

    );

});

module.exports = {
    getInsight
};