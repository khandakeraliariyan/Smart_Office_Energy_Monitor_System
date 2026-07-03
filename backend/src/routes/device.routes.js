const express = require("express");

const router = express.Router();

const { getAllDevices, getDevice, updateDeviceStatus } = require("../controllers/device.controller");

const validate = require("../middleware/validate");

const { updateDeviceSchema } = require("../validators/device.validator");

router.get("/", getAllDevices);

router.get("/:id", getDevice);

router.patch("/:id/status", validate(updateDeviceSchema), updateDeviceStatus);

module.exports = router;