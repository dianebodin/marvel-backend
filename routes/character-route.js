const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");

const date = new Date();
const timestamp = Math.floor(date.getTime()/1000);
const hash = md5(timestamp + process.env.MARVEL_API_PRIVATE_KEY + process.env.MARVEL_API_PUBLIC_KEY);


//tous les personnages marvel
router.get("/characters", async (req, res) => {
  try {
    const offset = req.query.offset;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}&orderBy=name`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//character depuis son id
router.get("/character/:id", async (req, res) => {
  try {
    const id_character = req.params.id;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id_character}?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//comics liés au character depuis son id
router.get("/character/:id/comics", async (req, res) => {
  try {
    const id_character = req.params.id;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id_character}/comics?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//search character depuis son nom
router.get("/search/characters", async (req, res) => {
  try {
    const offset = req.query.offset;
    const name_character = req.query.nameStartsWith;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}&orderBy=name&nameStartsWith=${name_character}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;