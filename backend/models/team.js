//  import mongoose module
const mongoose = require("mongoose");
// Create Team Schema
const teamSchema = mongoose.Schema({
    teamName: String,
    teamOwner: String,
    foundation: Number,
    players: [
        {type: mongoose.Schema.Types.ObjectId , ref:"Player"}
    ],
    stadiumId: {type: mongoose.Schema.Types.ObjectId , ref:"Stadium"},
});

//  Affect Team Schema to Model Name Team
const team = mongoose.model("Team", teamSchema);
//  Make team exportable
module.exports = team;