const config = require("../config/mysql");
const mysql = require("mysql");
const publicIp = require("public-ip");

const fetchComments = async (req, res) => {
  var connection = mysql.createConnection(config.config);
  connectToDB(connection);
  fetchData(req, res, connection);
};

const addComment = async (req, res) => {
  var connection = mysql.createConnection(config.config);
  connectToDB(connection);
  createComment(req, res, connection);
};

const connectToDB = (connection) => {
  connection.connect((error) => {
    if (!error) {
      console.log("DB Connected");
    } else {
      console.log(`DB Connection failed with error: ${error.message}`);
    }
  });
};

const createComment = async (req, res, connection) => {
  try {
    const commentData = {
      ip_address: await publicIp.v4(),
      date: new Date(),
      comment: req.body.comment,
      movie_id: req.body.episode_id,
    };

    connection.query(
      "INSERT INTO comments SET ?",
      commentData,
      function (error, results, fields) {
        connection.end();
        if (!error) {
          res.status(200).send({
            status: "success",
            message: "Comments saved successfully",
          });
        } else {
          res.status(500).send({
            status: "error",
            message: error.message,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

const fetchData = (req, res, connection) => {
  try {
    connection.query(
      "SELECT * from comments ORDER BY date DESC",
      (err, rows, field) => {
        if (!err) {
          connection.end();
          res.status(200).send({
            status: "success",
            message: "Comments fetched successfully",
            data: rows,
          });
        } else {
          console.log(err.message);
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  fetchComments,
  addComment,
};
