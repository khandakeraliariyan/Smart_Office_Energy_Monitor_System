const DeviceService = require("../services/device.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllDevices = asyncHandler(async (req, res) => {

    const devices = await DeviceService.getAllDevices();

    return res.status(200).json(
        new ApiResponse(
            true,
            "Devices fetched successfully",
            devices
        )
    );

});

const getDevice = asyncHandler(async (req, res) => {

    const device = await DeviceService.getDeviceById(req.params.id);

    if (!device) {

        return res.status(404).json(
            new ApiResponse(false, "Device not found")
        );

    }

    return res.status(200).json(
        new ApiResponse(
            true,
            "Device fetched successfully",
            device
        )
    );

});

const updateDeviceStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const updated = await DeviceService.updateStatus(
        req.params.id,
        status
    );

    if (!updated) {

        return res.status(404).json(
            new ApiResponse(false, "Device not found")
        );

    }

    return res.status(200).json(
        new ApiResponse(
            true,
            "Device updated successfully",
            updated
        )
    );

});

module.exports = {

    getAllDevices,

    getDevice,

    updateDeviceStatus

};