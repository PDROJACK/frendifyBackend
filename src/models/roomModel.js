const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  trackName: String,
  trackId: String,
  users: [String],
});

module.exports = mongoose.model("Room", RoomSchema);
