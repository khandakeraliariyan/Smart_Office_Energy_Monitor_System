const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["Light", "Fan"],
            required: true
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        status: {
            type: Boolean,
            default: false
        },

        powerRating: {
            type: Number,
            required: true
        },

        currentPower: {
            type: Number,
            default: 0
        },

        lastChanged: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Device", deviceSchema);