// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın

const express = require("express");
const server = express();
const router = require("./posts/posts-router");
const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use("/api/posts", router);
server.post("/webhook", (req, res) => {
  const receivedData = req.body; // Data received from the Typeform webhook
  console.log("Received webhook data:", receivedData);
  res.sendStatus(200);
});
module.exports = server;
