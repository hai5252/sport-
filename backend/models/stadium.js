//  import mongoose module
const mongoose = require("mongoose");
// Create Player Schema
const stadiumSchema = mongoose.Schema({
    name: String,
    category: Number,
    // avatar: String,
    team: {type: mongoose.Schema.Types.ObjectId , ref:"Team"},

});

//  Affect Stadium Schema to Model Name Stadium
const stadium = mongoose.model("Stadium", stadiumSchema);
//  Make stadium exportable
module.exports = stadium;