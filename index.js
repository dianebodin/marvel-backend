const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


const userRoutes = require("./routes/user-route");
app.use(userRoutes);

const characterRoutes = require("./routes/character-route");
app.use(characterRoutes);

const comicRoutes = require("./routes/comic-route");
app.use(comicRoutes);

const favoriteRoutes = require("./routes/favorite-route");
app.use(favoriteRoutes);


app.all("*", function (req, res) {
  res.status(404).json({ error: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
