const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

const commentController = require("../controllers/commentController");

router.get("/fetchComments", commentController.fetchComments);
router.post("/addComment", commentController.addComment);

module.exports = router;
