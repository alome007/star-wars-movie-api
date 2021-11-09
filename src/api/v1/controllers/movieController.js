const axios = require("axios");
require("dotenv").config();
const config = require("../config/mysql");
const mysql = require("mysql");

const fetchMovies = async (req, res) => {
  const base_url = process.env.BASE_URL;
  try {
    const films = await axios.get(`${base_url}/films`);
    const filmsData = films.data.results;
    let data = await filmsData.map((v) => ({
      title: v.title,
      opening_crawl: v.opening_crawl,
      date_released: v.release_date,
      episode_id: v.episode_id,
    }));

    let sortByReleaseDate = data.sort(
      (a, b) => new Date(a.date_released) - new Date(b.date_released)
    );

    res.status(200).send({
      status: "success",
      message: "movies fetched successfully",
      data: sortByReleaseDate,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

//todo
// const getcount = (id, connection) => {
//   var commentCount = 0;
//   connection.query(
//     "SELECT * FROM `comments` WHERE `movie_id` = ?",
//     [id],
//     (err, rows, field) => {
//       console.log(rows.length);
//       if (!err) {
//         commentCount = rows.length;
//       } else {
//         commentCount = 0;
//       }
//     }
//   );
//   return commentCount;
// };

const connectToDB = (connection) => {
  connection.connect((error) => {
    if (!error) {
      console.log("DB Connected");
    } else {
      console.log(`DB Connection failed with error: ${error.message}`);
    }
  });
};

module.exports = {
  fetchMovies,
};
