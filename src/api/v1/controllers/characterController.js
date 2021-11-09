const axios = require("axios");
require("dotenv").config();
const sortCharactetList = require("../helpers/sort");

const fetchCharacters = async (req, res) => {
  const base_url = process.env.BASE_URL;
  try {
    let query = req.query;
    const characters = await axios.get(`${base_url}/people`);
    const charactersData = characters.data.results;
    let data = await charactersData.map((v) => ({
      name: v.name,
      height: v.height,
      hair_color: v.hair_color,
      gender: v.gender,
      homeworld: v.homeworld,
    }));
    let sortedList = sortCharactetList.sortCharactetList(data, query);
    res.status(200).send({
      status: "success",
      message: "characters fetched successfully",
      data: sortedList,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  fetchCharacters,
};
