//  import mongoose module
const mongoose = require("mongoose");
// Create Match Schema
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
});

//  Affect Match Schema to Model Name Match
const match = mongoose.model("Match", matchSchema);
//  Make match exportable
module.exports = match;