//  import mongoose module
const mongoose = require("mongoose");
// Create Player Schema
const playerSchema = mongoose.Schema({
    name: String,
    position: String,
    nbr: Number,
    avatar: String,
    teamId: {type: mongoose.Schema.Types.ObjectId , ref:"Team"},

});

//  Affect Player Schema to Model Name Player
const player = mongoose.model("Player", playerSchema);
//  Make player exportable
module.exports = player;