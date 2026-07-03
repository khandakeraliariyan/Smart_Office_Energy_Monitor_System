const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
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
            enum: ["Low", "Medium", "High"],
            default: "Low"
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