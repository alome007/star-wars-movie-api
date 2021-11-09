const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movieController");

router.get("/fetchMovies", moviesController.fetchMovies);

module.exports = router;
