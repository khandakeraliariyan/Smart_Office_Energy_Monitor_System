const DashboardService = require("../services/dashboard.service");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {

    const dashboard = await DashboardService.getDashboardData();

    res.status(200).json(

        new ApiResponse(

            true,

            "Dashboard data fetched successfully",

            dashboard

        )

    );

});

module.exports = {

    getDashboard

};