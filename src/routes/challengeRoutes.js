const express = require("express");
const challenge = express.Router();

const chapterController = require("../controllers/challengeController");

challenge.get("/books/:id/chapters/:chapter_id", chapterController);

module.exports = challenge;