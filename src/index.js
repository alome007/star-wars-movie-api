const express = require("express");
require("dotenv").config();
const app = express();
const mysql = require("mysql");
const movieRoute = require("../src/api/v1/routes/movieRoute");
const characterRoute = require("../src/api/v1/routes/characterRoute");
const commentRoute = require("./api/v1/routes/commentRoute");

app.use("/movies", movieRoute);
app.use("/characters", characterRoute);
app.use("/comments", commentRoute);

app.get("/", (req, res) => {
  res.send("star-wars-api v1");
});

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`App listening on ${PORT}`);
});
