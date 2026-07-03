const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(errorMiddleware);
    
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Office Monitoring API Running"
    });
});

module.exports = app;