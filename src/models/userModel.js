const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    display_name: String,
    profile: Object,
    trackId: String,
    id: String
});


module.exports = mongoose.model('User', UserSchema);