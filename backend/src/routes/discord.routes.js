const express = require("express");

const router = express.Router();

const { askOffice } = require("../controllers/discord.controller");

router.post("/ask", askOffice);
router.get("/ask", askOffice);

module.exports = router;
