const RoomService = require("../services/room.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getRooms = asyncHandler(async (req, res) => {

    const rooms = await RoomService.getAllRooms();

    res.status(200).json(

        new ApiResponse(
            true,
            "Rooms fetched successfully",
            rooms
        )

    );

});

module.exports = {
    getRooms
};