const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const server = express();
var cors = require("cors");
const pdRouter = require("./pipe_drive/pd-router");
const mongoRouter = require("./mongoDB/mongoDB-router");
require("dotenv").config();
const { PORT, mongoString } = require("../config/config");
const titleRouter = require("./mongoDB/titles/titlesRouter");
const sectorRouter = require("./mongoDB/sectors/sectorsRouter");
const exceptionRouter = require("./mongoDB/exceptions/exceptionRouter");
const calculationsRouter = require("./mongoDB/calculations/calculationsRouter");

server.use(express.json());
server.use(cors());

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

server.use("/mongo", mongoRouter);
server.use("/titles", titleRouter);
server.use("/sectors", sectorRouter);
server.use("/exceptions", exceptionRouter);
server.use("/calculations", calculationsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Server is running on port ${PORT} </h1>`);
});

server.use("/users", pdRouter);
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "server error",
  });
});

module.exports = server;
