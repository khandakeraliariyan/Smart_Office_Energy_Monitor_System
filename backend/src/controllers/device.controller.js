const DeviceService = require("../services/device.service");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getAllDevices = asyncHandler(async (req, res) => {

    const devices = await DeviceService.getAllDevices();

    res.status(200).json(

        new ApiResponse(

            true,

            "Devices fetched successfully",

            devices
        )
    );
});

module.exports = {

    getAllDevices

};