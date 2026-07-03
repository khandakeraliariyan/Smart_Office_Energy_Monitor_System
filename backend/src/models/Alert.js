const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [
                "AFTER_HOURS",
                "ROOM_ACTIVE",
                "HIGH_POWER"
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },

        severity: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "LOW"
        },

        resolved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);