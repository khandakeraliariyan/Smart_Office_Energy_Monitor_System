require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Room = require("../models/Room");
const Device = require("../models/Device");

const seedDatabase = async () => {
    try {

        await connectDB();

        console.log("Connected to Database");

        // Delete Previous Data

        await Device.deleteMany({});
        await Room.deleteMany({});

        console.log("Old Data Deleted");

        // Create Rooms

        const drawingRoom = await Room.create({
            name: "Drawing Room",
            description: "Waiting Area"
        });

        const workRoom1 = await Room.create({
            name: "Work Room 1",
            description: "Employee Workspace"
        });

        const workRoom2 = await Room.create({
            name: "Work Room 2",
            description: "Employee Workspace"
        });

        console.log("Rooms Created");

        // Device Generator

        const createDevices = async (room) => {

            // Fans

            for (let i = 1; i <= 2; i++) {

                await Device.create({

                    name: `Fan ${i}`,

                    type: "Fan",

                    room: room._id,

                    powerRating: 60,

                    currentPower: 0,

                    status: false

                });

            }

            // Lights

            for (let i = 1; i <= 3; i++) {

                await Device.create({

                    name: `Light ${i}`,

                    type: "Light",

                    room: room._id,

                    powerRating: 15,

                    currentPower: 0,

                    status: false

                });

            }

        };

        await createDevices(drawingRoom);

        await createDevices(workRoom1);

        await createDevices(workRoom2);

        console.log("15 Devices Created");

        console.log("Database Seeded Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedDatabase();