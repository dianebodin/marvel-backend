const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");

const date = new Date();
const timestamp = Math.floor(date.getTime()/1000);
const hash = md5(timestamp + process.env.MARVEL_API_PRIVATE_KEY + process.env.MARVEL_API_PUBLIC_KEY);


//tous les comics marvel
router.get("/comics", async (req, res) => {
  try {
    const offset = req.query.offset;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}&orderBy=title`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//search comic depuis son titre
router.get("/search/comics", async (req, res) => {
  try {
    const offset = req.query.offset;
    const title_comic = req.query.titleStartsWith;
    const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}&orderBy=title&titleStartsWith=${title_comic}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;