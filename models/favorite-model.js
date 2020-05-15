const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fav_characters: [
    {
      _id: Number,
      name: String,
      description: String,
      img: String,
    }
  ],
  fav_comics: [
    {
      _id: Number,
      title: String,
      description: String,
      img: String,
    }
  ],
});

module.exports = Favorite;