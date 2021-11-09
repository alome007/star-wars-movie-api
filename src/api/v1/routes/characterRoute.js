const express = require("express");
const router = express.Router();

const characterController = require("../controllers/characterController");

router.get("/fetchCharacters", characterController.fetchCharacters);

module.exports = router;
