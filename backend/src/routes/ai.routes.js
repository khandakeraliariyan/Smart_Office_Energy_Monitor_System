const express = require("express");

const router = express.Router();

const { getInsight } = require("../controllers/ai.controller");

router.get("/", getInsight);

module.exports = router;