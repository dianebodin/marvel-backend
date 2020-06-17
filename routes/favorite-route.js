const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const Favorite = require("../models/favorite-model");
const User = require("../models/user-model");


//ajout et suppression favoris characters
router.put("/favorite/characters", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {
      if (req.fields.id_char) { //id du character

        let obj_char = {};
        obj_char._id = Number(req.fields.id_char);
        obj_char.name = req.fields.name;
        obj_char.description = req.fields.description;
        obj_char.img = req.fields.img;

        const f = await Favorite.findOne({ creator: req.user._id });
        if (f) {
          let inTab = f.fav_characters.find(elm => elm._id === obj_char._id);
          if (inTab !== undefined) f.fav_characters.remove(inTab); //character présent dans le tableau -> remove
          else f.fav_characters.push(obj_char); //character absent dans le tableau -> push
          await f.save();
          return res.status(200).json(f.fav_characters);
        }
      }
    } else return res.status(401).json({ error: "User unauthorized" });
    return res.status(200);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//affiche favoris characters
router.get("/fav_characters", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {

      const f = await Favorite.findOne({ creator: req.user._id });

      if (f) return res.status(200).json(f.fav_characters);
      else return res.status(404).json({ error: "Favorite not found" });
    } else return res.status(401).json({ error: "User unauthorized" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//tableau d'id
router.get("/fav_characters/by_id", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {
      const f = await Favorite.findOne({ creator: req.user._id });
      if (f) {
        let tab = [];
        for (let i = 0; i < f.fav_characters.length; i++) {
          tab.push(JSON.stringify(f.fav_characters[i]._id));
        }
        return res.status(200).json(tab);
      }
      else return res.status(404).json({ error: "Favorite not found" });
    } else return res.status(401).json({ error: "User unauthorized" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//ajout et suppression favoris comics
router.put("/favorite/comics", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {
      if (req.fields.id_com) { //id du comic

      let obj_com = {};
      obj_com._id = Number(req.fields.id_com);
      obj_com.title = req.fields.title;
      obj_com.description = req.fields.description;
      obj_com.img = req.fields.img;

      const f = await Favorite.findOne({ creator: req.user._id });
        if (f) {
          let inTab = f.fav_comics.find(elm => elm._id === obj_com._id);
          if (inTab !== undefined) f.fav_comics.remove(inTab); //comic présent dans le tableau -> remove
          else f.fav_comics.push(obj_com); //comic absent dans le tableau -> push
          await f.save();
          return res.status(200).json(f.fav_comics);
        }
      }
    } else return res.status(401).json({ error: "User unauthorized" });
    return res.status(200);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//affiche favoris comics
router.get("/fav_comics", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {

      const f = await Favorite.findOne({ creator: req.user._id });

      if (f) return res.status(200).json(f.fav_comics);
      else return res.status(404).json({ error: "Favorite not found" });
    } else return res.status(401).json({ error: "User unauthorized" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//tableau d'id
router.get("/fav_comics/by_id", isAuthenticated, async (req, res) => {
  try {
    if (req.user) {
      const f = await Favorite.findOne({ creator: req.user._id });
      if (f) {
        let tab = [];
        for (let i = 0; i < f.fav_comics.length; i++) {
          tab.push(JSON.stringify(f.fav_comics[i]._id));
        }
        return res.status(200).json(tab);
      }
      else return res.status(404).json({ error: "Favorite not found" });
    } else return res.status(401).json({ error: "User unauthorized" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;