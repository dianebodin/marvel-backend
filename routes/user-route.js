const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/user-model");
const Favorite = require("../models/favorite-model");


//inscription
router.post("/user/sign_up", async (req, res) => {
  try {
    if (req.fields.username && req.fields.password) {
      if (req.fields.username.trim().length > 0) {
        const u_username = await User.findOne({ "username": req.fields.username }); //doublon username
        if (!u_username) {
            if (req.fields.password.length >= 5) {

              const salt_save = uid2(16);
              const newUser = new User({
                username: req.fields.username,
                token: uid2(16),
                salt: salt_save,
                hash: SHA256(req.fields.password + salt_save).toString(encBase64),
              });
              await newUser.save();

              const newFavorite = new Favorite({
                creator: newUser.id,
                fav_characters: [],
                fav_comics: [],
              });
              await newFavorite.save();

              return res.status(200).json({ token: newUser.token, username: newUser.username });
            } else return res.status(400).json({ error: "Password must contain less than 5 characters" });
        } else return res.status(400).json({ error: "Username already used" });
      } else return res.status(400).json({ error: "All fields must be completed correctly" });
    } else return res.status(400).json({ error: "All fields must be completed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


//connexion
router.post("/user/log_in", async (req, res) => {
  try {
    if (req.fields.username && req.fields.password) {
      const u = await User.findOne({ username: req.fields.username });
      if (u) {
        if (u.hash === SHA256(req.fields.password + u.salt).toString(encBase64)) {

          return res.status(200).json({ token: u.token, username: u.username }); //user connecté

        } else return res.status(400).json({ error: "Wrong password" });
      } else return res.status(404).json({ error: "Username not found" });
    } else return res.status(400).json({ error: "All fields must be completed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;